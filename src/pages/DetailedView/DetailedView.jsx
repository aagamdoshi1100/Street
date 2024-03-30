import useCartContext from "../../contexts/CartContext";
import { useFetchContext } from "../../contexts/FetchContext";
import useWishListContext from "../../contexts/WishListContext";
import NavBar from "../../Components/NavBarPage/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import styles from "./detailedView.module.css";
import { checkIsUserLoggedIn } from "../../Components/utils";

export default function DetailedView() {
  const { productId } = useParams();
  const { productState, fetchSeletedProduct } = useFetchContext();
  const { addToCart, cartItem } = useCartContext();
  const { manageWishList } = useWishListContext();
  const cloud_name = process.env.REACT_APP_Cloud_Name;
  useEffect(() => {
    fetchSeletedProduct(productId);
  }, [productId]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  localStorage.setItem("path", window.location.pathname);
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.mainContainer}>
        {Array.isArray(productState.selectedProduct) &&
        productState.selectedProduct.length > 0 ? (
          productState.selectedProduct.map((item) => {
            const { _id, Name, Price, Rating, Discount, Stock, About } = item;
            return (
              <div className={styles.product} key={_id}>
                <div className={styles.imgContainer}>
                  <img
                    src={`https://res.cloudinary.com/${cloud_name}/image/upload/${productId}.jpg`}
                    width="100%"
                    height="100%"
                    className={styles.imageProduct}
                    alt=""
                  />
                  {Discount > 15 && (
                    <p className={styles.offer}>Limited offer</p>
                  )}
                </div>
                <div className={styles.productDetails}>
                  <p className={styles.productName}>{Name}</p>
                  <p className={styles.rating}>
                    <span className={styles.ratingText}>{Rating}</span>
                    {"Rating".split("").map((a, index) => {
                      if (parseInt(Rating) <= index) {
                        return "";
                      } else {
                        return (
                          <IoStarSharp
                            key={index}
                            className={styles.ratingIcon}
                          />
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
                    <span className={styles.discount}>-{Discount}%</span>
                    <span>
                      <LiaRupeeSignSolid size="1.2em" />
                    </span>
                    <span className={styles.mrp}>
                      {Price - Math.floor((Price * Discount) / 100)}
                    </span>
                  </p>
                  <p>
                    <span className={styles.originalMRPHeading}>MRP:</span>
                    <span className={styles.originalMRP}>{Price}</span>
                  </p>
                  {Stock > 0 ? (
                    <>
                      <p className={styles.inStock}>
                        In stock
                        {Discount > 15 && (
                          <span className={styles.offerForDesktop}>
                            Limited offer
                          </span>
                        )}
                      </p>
                      <div className={styles.pageButtons}>
                        {cartItem?.cartArray?.find(
                          (thing) => thing._id === _id
                        ) ? (
                          <button
                            className={styles.addToCart}
                            onClick={() => navigate(`/users/${user._id}/cart`)}
                          >
                            Go to Cart
                          </button>
                        ) : (
                          <button
                            className={styles.addToCart}
                            onClick={() =>
                              checkIsUserLoggedIn(navigate, item._id, addToCart)
                            }
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className={styles.outStock}>Out of stock</p>
                  )}
                  <div className={styles.pageButtons}>
                    {productState.cartAndWishlistStatus.wishlistStatus.includes(
                      productId
                    ) ? (
                      <button
                        className={styles.addToWishList}
                        onClick={() => navigate(`/users/${user._id}/wishlist`)}
                      >
                        Go to wishlist
                      </button>
                    ) : (
                      <button
                        className={styles.addToWishList}
                        onClick={() =>
                          checkIsUserLoggedIn(navigate, item, manageWishList)
                        }
                      >
                        Add to Wishlist
                      </button>
                    )}
                  </div>

                  <div className={styles.aboutProduct}>
                    <p className={styles.aboutHeading}>Description</p>
                    <p className={styles.description}>{About}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No product found</p>
        )}
      </div>
    </div>
  );
}
