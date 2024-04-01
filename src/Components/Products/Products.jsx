import useCartContext from "../../contexts/CartContext";
import useWishListContext from "../../contexts/WishListContext";
import styles from "./Products.module.css";
import { IoStarOutline } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { checkIsUserLoggedIn } from "../utils";

export default function Products({ data, status }) {
  const { addToCart, cartItem } = useCartContext();
  const { manageWishList } = useWishListContext();
  const navigate = useNavigate();
  const cloud_name = process.env.REACT_APP_Cloud_Name;
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={styles.container}>
      {data.map((item) => {
        const { _id, Name, Price, Rating, Discount } = item;
        return (
          <div className={styles.card} key={_id}>
            {status.wishlistStatus.includes(_id) ? (
              <IoMdHeart
                className={styles.wishlistMarked}
                onClick={() =>
                  checkIsUserLoggedIn(navigate, item, manageWishList)
                }
              />
            ) : (
              <AiOutlineHeart
                className={styles.wishlist}
                onClick={() =>
                  checkIsUserLoggedIn(navigate, item, manageWishList)
                }
              />
            )}
            <img
              src={`https://res.cloudinary.com/${cloud_name}/image/upload/${_id}.jpg`}
              width="100%"
              height="100%"
              alt=""
              onClick={() => navigate(`/products/${_id}`)}
            />
            <div
              className={styles.productDetails}
              onClick={() => navigate(`/products/${_id}`)}
            >
              <p className={styles.productname}>{Name}</p>
              <p className={styles.rating}>
                <span className={styles.ratingNumber}>{Rating}</span>
                {"Rating".split("").map((a, index) => {
                  if (parseInt(Rating) <= index) {
                    return "";
                  } else {
                    return (
                      <IoStarSharp className={styles.ratingIcon} key={index} />
                    );
                  }
                })}
                {Rating - parseInt(Rating) >= 0.5 ? (
                  <IoIosStarHalf className={styles.ratingIcon} />
                ) : (
                  <IoStarOutline className={styles.ratingIcon} />
                )}
              </p>
              <p className={styles.mrpDetails}>
                <span>
                  <LiaRupeeSignSolid size="0.8em" />
                </span>
                {Price - Math.floor((Price * Discount) / 100)}
                <span className={styles.MRPText}>MRP:</span>
                <span className={styles.MRP}>{Price}</span>
                <span className={styles.MRPText}>({Discount}% Off)</span>
              </p>
            </div>
            {status.cartStatus.find((pro) => pro._id === _id) ? (
              <button
                className={styles.cardBtn}
                onClick={() => navigate(`/users/${user._id}/cart`)}
              >
                Go to Cart
              </button>
            ) : (
              <>
                {cartItem.addToCartLoading.isEnabled &&
                _id === cartItem.addToCartLoading.productId ? (
                  <button className={styles.cardBtn}>Please wait...</button>
                ) : (
                  <button
                    className={styles.cardBtn}
                    onClick={() =>
                      checkIsUserLoggedIn(navigate, item._id, addToCart)
                    }
                  >
                    Add to Cart
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
