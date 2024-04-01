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
        cartDispacher({ type: "ADD_TO_CART", payload: cartProducts.cart });
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
      cartDispacher({ type: "LOADING" });
      cartDispacher({ type: "ADD_TO_CART", payload: cartProducts.cart });
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const cartController = async (data) => {
    console.log(data, "Aaa");
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
      if (manageCartResponse.ok && data.action === "INCREMENT") {
        cartDispacher({ type: "INCREMENT", payload: data });
        notificationHandler("The quantity of the product has been increased");
      } else if (manageCartResponse.ok && data.action === "DECREMENT") {
        cartDispacher({ type: "DECREMENT", payload: data });
        notificationHandler("The quantity of the product has been reduced.");
      } else {
        cartDispacher({ type: "REMOVE_FROM_CART", payload: data });
        notificationHandler("Product removed from the cart");
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
      if (res.ok) {
        cartDispacher({ type: "LOADING_MOVE_TO_WISHLIST", payload: "" });
        cartDispacher({ type: "MOVE_TO_WISHLIST", payload: product });
        notificationHandler("Product moved to wishlist");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalBill = cartItem?.cartArray?.reduce(
    (acc, cur) => {
      acc.Price =
        Number(acc.Price) + Number(cur.Price * cur.qtyOfsameProductInCart);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export default useCartContext;
