import useCartContext from "../../../contexts/CartContext";
import { useFetchContext } from "../../../contexts/FetchContext";
import useWishListContext from "../../../contexts/WishListContext";
import NavBar from "../../../Components/NavBarPage/NavBar";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { IoStarOutline } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";

export default function ProductDetails() {
  const { productId } = useParams();
  const { productState, fetchSeletedProduct } = useFetchContext();
  const { addToCart, cartItem } = useCartContext();
  const { addToWishList } = useWishListContext();
  const cloud_name = process.env.REACT_APP_Cloud_Name;
  useEffect(() => {
    fetchSeletedProduct(productId);
  }, [productId]);
  return (
    <div className="product-cards">
      <NavBar />
      {Array.isArray(productState.selectedProduct) &&
      productState.selectedProduct.length > 0 ? (
        productState.selectedProduct.map((item) => {
          const { _id, Name, Price, Public_Id, Rating, Discount } = item;
          return (
            <div className="box" key={_id}>
              <div className="img-container">
                <img
                  src={`https://res.cloudinary.com/${cloud_name}/image/upload/${Public_Id}.jpg`}
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
              <div className="description">
                <p className="productName">{Name}</p>
                {/* <div className="material">{Material}</div> */}
                <p>
                  <span>{Rating}</span>
                  {"Rating".split("").map((a, index) => {
                    if (parseInt(Rating) <= index) {
                      return "";
                    } else {
                      return <IoStarSharp key={index} />;
                    }
                  })}
                  {Rating - parseInt(Rating) >= 0.5 ? (
                    <IoIosStarHalf />
                  ) : (
                    <IoStarOutline />
                  )}
                </p>
                <h3>Price: Rs {Price}</h3>
                <div className="btns">
                  {cartItem?.cartArray?.find((thing) => thing._id === _id) ? (
                    <button className="card-btn card-btn-single">
                      Go to Cart
                    </button>
                  ) : (
                    <button
                      className="card-btn card-btn-single"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  )}
                  <button
                    className="card-btn card-btn-single"
                    onClick={() => addToWishList(item)}
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
}
