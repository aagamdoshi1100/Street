import { useNavigate } from "react-router-dom";
import useCartContext from "../../contexts/CartContext";
import { useFetchContext } from "../../contexts/FetchContext";
import NavBar from "../../Components/NavBarPage/NavBar";
import "./Cart.css";
import { useEffect } from "react";
import { IoStarOutline } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import Loading from "../../Components/Loading/Loading";

export default function Cart() {
  const {
    fetchCartProducts,
    cartItem,
    cartController,
    moveToWishlist,
    totalBill,
  } = useCartContext();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartProducts();
  }, []);
  const cloud_name = process.env.REACT_APP_Cloud_Name;
  localStorage.setItem("path", window.location.pathname);

  return (
    <div className="cart">
      <NavBar />
      {cartItem.loading ? (
        <div className="cartLoading">
          <Loading />
        </div>
      ) : (
        <div className="main-cart">
          {cartItem.cartArray.length > 0 && (
            <div className="header">
              <h3>Cart [{cartItem.cartArray?.length}]</h3>
            </div>
          )}
          {cartItem.cartArray.length > 0 &&
          Array.isArray(cartItem.cartArray) ? (
            <div className="cart-container">
              {cartItem.cartArray.map((item) => {
                const { _id, Price, Rating, Name, qtyOfsameProductInCart } =
                  item;
                return (
                  <div className="cart-card" key={_id}>
                    <div className="card-left">
                      <div className="cartImgDiv">
                        {
                          <img
                            src={`https://res.cloudinary.com/${cloud_name}/image/upload/${_id}.jpg`}
                            width="100%"
                            height="100%"
                            className="cartProductImg"
                            alt=""
                            onClick={() => navigate(`/products/${_id}`)}
                          />
                        }
                        <MdDeleteOutline
                          className="removeBtn"
                          onClick={() =>
                            cartController({
                              _id: item._id,
                              action: "REMOVE",
                            })
                          }
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
                        <div className="qty-btns">
                          <button
                            className="qtyController"
                            onClick={() =>
                              cartController({ _id, action: "INCREMENT" })
                            }
                          >
                            +
                          </button>
                          <button className="qty">
                            {qtyOfsameProductInCart}
                          </button>
                          {qtyOfsameProductInCart > 1 ? (
                            <button
                              className="qtyController"
                              onClick={() =>
                                cartController({ _id, action: "DECREMENT" })
                              }
                            >
                              -
                            </button>
                          ) : (
                            <button
                              className="qtyController"
                              onClick={() =>
                                cartController({ _id, action: "DECREMENT" })
                              }
                              disabled
                            >
                              -
                            </button>
                          )}
                        </div>
                        {cartItem.moveToWishListLoading.isEnabled &&
                        cartItem.moveToWishListLoading.productId ===
                          item._id ? (
                          <button className="cartWishListBtn">
                            Please wait..
                          </button>
                        ) : (
                          <button
                            className="cartWishListBtn"
                            onClick={() => moveToWishlist(item)}
                          >
                            Move To WishList
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}{" "}
            </div>
          ) : (
            <div className="emptyCart">
              <img
                src="../../emptyCart.png"
                width="100%"
                height="100%"
                alt="emptycart"
              />
            </div>
          )}
          {Array.isArray(cartItem.cartArray) &&
          cartItem.cartArray.length > 0 ? (
            <div className="checkout">
              <div className="checkout-card">
                <h3>PRICE DETAILS</h3>
                <hr />
                <div className="checkout-card-details">
                  <p>Price ({totalBill.qtyOfsameProductInCart} items)</p>
                  <p> {totalBill.Price} </p>
                </div>
                <div className="checkout-card-details">
                  <p>Discount </p>
                  <p>-1000</p>
                </div>
                <div className="checkout-card-details">
                  <p>Delivery Charges</p>
                  <p>50</p>
                </div>
                <div className="checkout-card-details">
                  <p>Total Amount</p>
                  <p>{totalBill.Price - 1000 + 50}</p>
                </div>
                <div className="checkout-card-offer">
                  <p className="checkout-card-offer">
                    You will save 1000 Rs on this order
                  </p>
                </div>
                <div className="placeorder">
                  <button
                    className="placeOrderBtn"
                    onClick={() => navigate("/pages/AddressPage/Address")}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      )}
    </div>
  );
}
