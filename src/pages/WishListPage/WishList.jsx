import { useEffect } from "react";
import useWishListContext from "../../contexts/WishListContext";
import { useFetchContext } from "../../contexts/FetchContext";
import NavBar from "../../Components/NavBarPage/NavBar";
import { IoStarOutline } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function WishList() {
  const { wishListItem, fetchWishlist, manageWishList, moveToCart } =
    useWishListContext();
  const { showClickedProduct } = useFetchContext();
  const cloud_name = process.env.REACT_APP_Cloud_Name;
  useEffect(() => {
    fetchWishlist();
  }, []);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("path", window.location.pathname);

  return (
    <>
      <NavBar />
      {wishListItem.loading ? (
        <div className="cartLoading">
          <Loading />
        </div>
      ) : (
        <>
          {Array.isArray(wishListItem.WishListArray) &&
          wishListItem.WishListArray.length > 0 ? (
            <div className="cart">
              <div className="main-cart">
                {wishListItem.WishListArray.length > 0 && (
                  <div className="header">
                    <h3>Wishlist [{wishListItem.WishListArray.length}]</h3>
                  </div>
                )}
                <div className="cart-container">
                  {wishListItem?.WishListArray?.map((item) => {
                    const { _id, Price, Rating, Name } = item;
                    return (
                      <div className="cart-card" key={_id}>
                        <div className="card-left">
                          <div className="cartImgDiv">
                            <img
                              src={`https://res.cloudinary.com/${cloud_name}/image/upload/${_id}.jpg`}
                              width="100%"
                              height="100%"
                              className="cartProductImg"
                              alt=""
                              onClick={() => navigate(`/products/${_id}`)}
                            />
                            <MdDeleteOutline
                              className="removeBtn"
                              onClick={() => manageWishList(item)}
                            />
                          </div>

                          <div className="cart-product-description">
                            <p onClick={() => navigate(`/products/${_id}`)}>
                              {Name}
                            </p>
                            <p className="rating">
                              <span className="ratingText"> {Rating}</span>
                              {"Rating".split("").map((a, index) => {
                                if (parseInt(Rating) <= index) {
                                  return "";
                                } else {
                                  return (
                                    <IoStarSharp
                                      className="ratingIcon"
                                      key={index}
                                    />
                                  );
                                }
                              })}
                              {Rating - parseInt(Rating) >= 0.5 ? (
                                <IoIosStarHalf className="ratingIcon" />
                              ) : (
                                <IoStarOutline className="ratingIcon" />
                              )}
                            </p>
                            <p>
                              <LiaRupeeSignSolid /> {Price}
                            </p>
                            {wishListItem.loadingStates.moveToCartLoading
                              .isEnabled &&
                            item._id ===
                              wishListItem.loadingStates.moveToCartLoading
                                .productId ? (
                              <button className="cartWishListBtn">
                                Please wait...
                              </button>
                            ) : (
                              <button
                                className="cartWishListBtn"
                                onClick={() => moveToCart(item)}
                              >
                                Move To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="emptyWishlist">
              <img
                src="../../emptyWishlist.png"
                width="100%"
                height="100%"
                alt="emptyWishlist"
              />
            </div>
          )}
        </>
      )}
      <div className="floatingIcon">
        <AiOutlineShoppingCart
          size="2.0em"
          className="cartIcon"
          onClick={() => navigate(`/users/${user._id}/cart`)}
        />
      </div>
    </>
  );
}
