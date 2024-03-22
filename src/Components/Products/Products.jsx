import useAuthContext from "../../contexts/AuthContext";
import useCartContext from "../../contexts/CartContext";
import { useFetchContext } from "../../contexts/FetchContext";
import useIconContext from "../../contexts/IconContext";
import useWishListContext from "../../contexts/WishListContext";
import styles from "./Products.module.css";
import { IoStarOutline } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";

export default function Products({ data }) {
  const { addToCart, cartItem } = useCartContext();
  const { addToWishList } = useWishListContext();
  const { AiOutlineHeart } = useIconContext();
  const { navigate } = useAuthContext();
  const cloud_name = process.env.REACT_APP_Cloud_Name;
  return (
    <div className={styles.container}>
      {data.map((item) => {
        const { _id, Name, Price, Rating, Discount } = item;
        return (
          <div className={styles.card} key={_id}>
            <AiOutlineHeart
              className={styles.wishlist}
              onClick={() => addToWishList(item)}
            />
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
            {cartItem?.cartArray?.find((thing) => thing._id === _id) ? (
              <button
                className={styles.cardBtn}
                onClick={() => navigate("/pages/CartPage/Cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className={styles.cardBtn}
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
