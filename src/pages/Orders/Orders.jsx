import React, { useEffect } from "react";
import "../CartPage/Cart.css";
import { useNavigate } from "react-router-dom";
import { IoStarOutline } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import useCartContext from "../../contexts/CartContext";
import NavBar from "../../Components/NavBarPage/NavBar";
import Loading from "../../Components/Loading/Loading";

function Orders() {
  const { fetchOrders, cartItem } = useCartContext();
  const cloud_name = process.env.REACT_APP_Cloud_Name;
  localStorage.setItem("path", window.location.pathname);
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="cart">
      <NavBar />
      {cartItem.loading ? (
        <div className="cartLoading">
          <Loading />
        </div>
      ) : (
        <>
          <div className="main-cart">
            {Array.isArray(cartItem.orderDetails.orders) &&
              cartItem.orderDetails.orders.length > 0 && (
                <div className="header">
                  <h3>Orders [{cartItem.orderDetails.orders.length || 0}]</h3>
                </div>
              )}
            {Array.isArray(cartItem.orderDetails.orders) &&
            cartItem.orderDetails.orders.length > 0 ? (
              <div className="cart-container">
                {cartItem.orderDetails.orders.map((item) => {
                  const { _id, Price, Rating, Discount, Name } = item;
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
                            <LiaRupeeSignSolid />{" "}
                            {Price - Math.floor((Price * Discount) / 100)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No orders yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;
