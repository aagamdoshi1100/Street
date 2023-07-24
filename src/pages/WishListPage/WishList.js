import { useEffect } from "react";
import useWishListContext from "../../contexts/WishListContext";
import { useFetchContext } from "../../contexts/FetchContext";
import NavBar from "../../Components/NavBarPage/NavBar";

export default function WishList() {
  const { wishListItem, removeFromWishList, moveToCart } = useWishListContext();
  const { showClickedProduct } = useFetchContext();

  return (
    <div className="cart">
      <NavBar />
      <h2>Wishlist</h2>
      <div className="main-cart">
        <div className="cart-container">
          {wishListItem?.WishListArray?.map((item) => {
            const { _id, image, price, rating, title } = item;
            return (
              <div className="cart-card" key={_id}>
                <div className="card-left">
                  <img
                    src={`${image}`}
                    width="160px"
                    height="160px"
                    alt=""
                    onClick={() => showClickedProduct(item)}
                  />
                  <div className="cart-product-description">
                    <p>{title}</p>
                    <p>{rating}⭐</p>
                    <p>Price: Rs {price}</p>
                  </div>
                </div>
                <div className="cart-right">
                  <button
                    className="card-btn "
                    onClick={() => moveToCart(item, "increment")}
                  >
                    Move To Cart
                  </button>
                  <button
                    className="card-btn "
                    onClick={() => removeFromWishList(item)}
                  >
                    Remove Product
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
