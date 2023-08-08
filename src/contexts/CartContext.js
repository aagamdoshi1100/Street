import { useContext, useReducer, createContext } from "react";
import CartReducer, { initialCartStatus } from "../Reducer/CartReducer";
import useAuthContext from "./AuthContext";
const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItem, cartDispacher] = useReducer(CartReducer, initialCartStatus);
  const { notificationHandler } = useAuthContext();

  const addToCart = async (item) => {
    try {
      const res = await fetch("/api/user/cart", {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: JSON.stringify({ product: item }),
      });
      const cartProducts = await res.json();
      cartDispacher({ type: "AADTOCART", payload: cartProducts.cart });
      notificationHandler("Added to the cart");
    } catch (e) {
      console.error(" addToCart ", e);
    }
  };

  const removeFromCart = async (item) => {
    let productId = item._id;
    console.log(productId, "Aaa");
    try {
      const res = await fetch(`/api/user/cart/${productId}`, {
        method: "DELETE",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });
      const cartProducts = await res.json();
      cartDispacher({ type: "REMOVEFROMCART", payload: cartProducts.cart });
      notificationHandler("Removed from cart");
    } catch (e) {
      console.error(e, "error while removing");
    }
  };

  const qtyControl = async (product, act) => {
    let productId = product._id;
    try {
      const res = await fetch(`/api/user/cart/${productId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: JSON.stringify({ action: { type: act } }),
      });
      const cartProducts = await res.json();
      cartDispacher({ type: "QTYCONTROL", payload: cartProducts.cart });
    } catch (e) {
      console.error(e, "error while removing");
    }
  };

  const totalBill = cartItem?.cartArray?.reduce(
    (acc, cur) => {
      acc.price = Number(acc.price) + Number(cur.price * cur.qty);
      acc.qty = acc.qty + cur.qty;
      return acc;
    },
    { price: 0, qty: 0 }
  );

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        qtyControl,
        totalBill,
        cartItem,
        cartDispacher,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export default useCartContext;
