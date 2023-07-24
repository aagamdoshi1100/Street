import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import useCartContext from "./CartContext";

const WishListContext = createContext();

export const WishListContextProvider = ({ children }) => {
  const [wishListItem, setWishListItem] = useState({ WishListArray: [] });
  const { cartItem, cartDispacher } = useCartContext();
  const myToken = localStorage.getItem("encodedToken");
  const addToWishList = async (product) => {
    try {
      const res = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { authorization: myToken },
        body: JSON.stringify({ product }),
      });
      const wishListProducts = await res.json();
      setWishListItem({
        ...wishListItem,
        WishListArray: wishListProducts.wishlist,
      });
    } catch (e) {
      console.error("addToCart:", e);
    }
  };

  const removeFromWishList = async (product) => {
    let productId = product._id;
    try {
      const res = await fetch(`/api/user/wishlist/${productId}`, {
        method: "DELETE",
        headers: { authorization: myToken },
      });
      const wishListProducts = await res.json();
      console.log(res, "res", wishListProducts);
      setWishListItem({
        ...wishListItem,
        WishListArray: wishListProducts.wishlist,
      });
    } catch (e) {
      console.error(" removeFromWishList:", e);
    }
  };

  const moveToCart = async (product, act) => {
    const productId = product._id;
    console.log("moveToCart:", act);

    const checkIfProductInCart = cartItem.cartArray.some(
      (item) => item._id === productId
    );

    try {
      if (checkIfProductInCart) {
        const incrementQtyIfProductPresent = await fetch(
          `/api/user/cart/${productId}`,
          {
            method: "POST",
            headers: { authorization: myToken },
            body: JSON.stringify({ action: { type: act } }),
          }
        );
        const incrementQtyOfProduct = await incrementQtyIfProductPresent.json();
        cartDispacher({
          type: "MOVEFROMWISHLIST",
          payload: incrementQtyOfProduct.cart,
        });
      } else {
        const addProductToCartIfProductNotFound = await fetch(
          "/api/user/cart",
          {
            method: "POST",
            headers: { authorization: myToken },
            body: JSON.stringify({ product }),
          }
        );
        const cartProducts = await addProductToCartIfProductNotFound.json();
        cartDispacher({ type: "AADTOCART", payload: cartProducts.cart });
      }
    } catch (error) {
      console.error("Error while processing cart:", error);
    }

    try {
      const removeWishListItemAfterMoving = await fetch(
        `/api/user/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            authorization: myToken,
          },
        }
      );
      const wishListProducts = await removeWishListItemAfterMoving.json();
      setWishListItem({
        ...wishListItem,
        WishListArray: wishListProducts.wishlist,
      });
    } catch (error) {
      console.error("Error while removing wishlist item:", error);
    }
  };

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        wishListItem,
        setWishListItem,
        removeFromWishList,
        moveToCart,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

const useWishListContext = () => useContext(WishListContext);

export default useWishListContext;
