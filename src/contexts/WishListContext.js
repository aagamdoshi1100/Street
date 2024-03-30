import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import useAuthContext from "./AuthContext";
import { API_URL } from "../constants";
import { useFetchContext } from "./FetchContext";

const WishListContext = createContext();

export const WishListContextProvider = ({ children }) => {
  const [wishListItem, setWishListItem] = useState({
    WishListArray: [],
    loading: false,
  });

  const { notificationHandler } = useAuthContext();
  const { productDispatcher } = useFetchContext();
  const manageWishList = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/${user._id}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify({ productId: product._id }),
      });
      if (res.ok) {
        if (wishListItem.WishListArray.find((pro) => pro._id === product._id)) {
          setWishListItem({
            ...wishListItem,
            WishListArray: wishListItem.WishListArray.filter(
              (pro) => pro._id !== product._id
            ),
          });
          productDispatcher({ type: "STATUS_WISHLIST", payload: product._id });
          notificationHandler("Product removed from wishlist");
        } else {
          setWishListItem({
            ...wishListItem,
            WishListArray: [...wishListItem.WishListArray, product],
          });
          productDispatcher({ type: "STATUS_WISHLIST", payload: product._id });
          notificationHandler("Product added to wishlist");
        }
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const fetchWishlist = async () => {
    try {
      setWishListItem({
        ...wishListItem,
        loading: true,
      });
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/${user._id}/wishlist`, {
        method: "GET",
        headers: { authorization: token },
      });
      const wishListProducts = await res.json();
      if (res.ok) {
        setWishListItem({
          ...wishListItem,
          loading: false,
          WishListArray: wishListProducts.wishlists,
        });
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const moveToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_URL}/users/${user._id}/wishlist/${product._id}/moveToCart`,
        {
          method: "PATCH",
          headers: { authorization: token },
        }
      );
      if (res.ok) {
        setWishListItem({
          ...wishListItem,
          WishListArray: wishListItem.WishListArray.filter(
            (pro) => pro._id !== product._id
          ),
        });
        notificationHandler("Product moved to cart");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WishListContext.Provider
      value={{
        manageWishList,
        fetchWishlist,
        wishListItem,
        setWishListItem,
        moveToCart,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

const useWishListContext = () => useContext(WishListContext);

export default useWishListContext;
