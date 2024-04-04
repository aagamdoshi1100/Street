import { useContext, useReducer, createContext } from "react";
import CartReducer, { initialCartStatus } from "../Reducer/CartReducer";
import useAuthContext from "./AuthContext";
import { API_URL } from "../constants";
import { useFetchContext } from "./FetchContext";
const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItem, cartDispacher] = useReducer(CartReducer, initialCartStatus);
  const { productDispatcher } = useFetchContext();
  const { notificationHandler } = useAuthContext();

  const addToCart = async (productId) => {
    try {
      cartDispacher({ type: "LOADING_ADD_TO_CART", payload: productId });
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${API_URL}/users/${user._id}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        const cartProducts = await res.json();
        cartDispacher({
          type: "ADD_TO_CART",
          payload: cartProducts.cart || [],
        });
        productDispatcher({ type: "STATUS_CART", payload: productId });
        cartDispacher({ type: "LOADING_ADD_TO_CART", payload: productId });
        notificationHandler("Added to the cart");
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const fetchCartProducts = async () => {
    try {
      cartDispacher({ type: "LOADING" });
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${API_URL}/users/${user._id}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const cartProducts = await res.json();
      if (res.ok) {
        cartDispacher({ type: "LOADING" });
        cartDispacher({
          type: "ADD_TO_CART",
          payload: cartProducts.cart ?? [],
        });
      } else {
        throw cartProducts;
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const cartController = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const manageCartResponse = await fetch(
        `${API_URL}/users/${user._id}/cart`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        }
      );
      const resData = await manageCartResponse.json();
      if (manageCartResponse.ok) {
        if (data.action === "INCREMENT") {
          cartDispacher({ type: "INCREMENT", payload: data });
          notificationHandler("The quantity of the product has been increased");
        } else if (data.action === "DECREMENT") {
          cartDispacher({ type: "DECREMENT", payload: data });
          notificationHandler("The quantity of the product has been reduced.");
        } else {
          cartDispacher({ type: "REMOVE_FROM_CART", payload: data });
          notificationHandler("Product removed from the cart");
        }
      } else {
        throw resData;
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const moveToWishlist = async (product) => {
    try {
      cartDispacher({ type: "LOADING_MOVE_TO_WISHLIST", payload: product._id });
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_URL}/users/${user._id}/cart/${product._id}/moveToWishlist`,
        {
          method: "PATCH",
          headers: { authorization: token },
        }
      );
      const resData = await res.json();
      if (res.ok) {
        cartDispacher({ type: "LOADING_MOVE_TO_WISHLIST", payload: "" });
        cartDispacher({ type: "MOVE_TO_WISHLIST", payload: product });
        notificationHandler("Product moved to wishlist");
      } else {
        throw resData;
      }
    } catch (err) {
      cartDispacher({ type: "LOADING_MOVE_TO_WISHLIST", payload: "" });
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const placeOrder = async (productIds) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${API_URL}/users/${user._id}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ data: productIds }),
      });
      const resData = await res.json();
      if (res.ok) {
        notificationHandler("Order Placed successfully");
      } else {
        throw resData;
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const fetchOrders = async () => {
    try {
      cartDispacher({ type: "LOADING" });
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${API_URL}/users/${user._id}/orders`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const resData = await res.json();
      if (res.ok) {
        cartDispacher({ type: "LOADING" });
        cartDispacher({ type: "FETCH_ORDERS", payload: resData.data });
        notificationHandler("Order fetched successfully");
      } else {
        throw resData;
      }
    } catch (err) {
      cartDispacher({ type: "LOADING" });
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const totalBill = cartItem?.cartArray?.reduce(
    (acc, cur) => {
      acc.Price =
        Number(acc.Price) +
        Number(
          (cur.Price - Math.floor((cur.Price * cur.Discount) / 100)) *
            cur.qtyOfsameProductInCart
        );
      acc.qtyOfsameProductInCart =
        acc.qtyOfsameProductInCart + cur.qtyOfsameProductInCart;
      return acc;
    },
    { Price: 0, qtyOfsameProductInCart: 0 }
  );
  return (
    <CartContext.Provider
      value={{
        addToCart,
        fetchCartProducts,
        cartController,
        totalBill,
        cartItem,
        cartDispacher,
        moveToWishlist,
        placeOrder,
        fetchOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export default useCartContext;
