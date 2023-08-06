import useAuthContext from "../../contexts/AuthContext";
import useCartContext from "../../contexts/CartContext";
import { useFetchContext } from "../../contexts/FetchContext";
import useIconContext from "../../contexts/IconContext";
import useWishListContext from "../../contexts/WishListContext";
import "./Products.css";

export default function Products() {
  const { data, showClickedProduct } = useFetchContext();
  const { addToCart, cartItem } = useCartContext();
  const { addToWishList } = useWishListContext();
  const { AiOutlineHeart } = useIconContext();
  const { navigate } = useAuthContext();
  return (
    <div className="products">
      {data.map((item) => {
        const { _id, image, price, rating, title } = item;
        return (
          <div className="card" key={_id}>
            <AiOutlineHeart
              className="wishlist"
              onClick={() => addToWishList(item)}
            />
            <img
              src={`${image}`}
              width="100%"
              height="100%"
              alt=""
              onClick={() => showClickedProduct(item)}
            />
            <p>{title}</p>
            <p>{rating}⭐</p>
            <p>Price: Rs {price}</p>
            {cartItem?.cartArray?.find((thing) => thing._id === _id) ? (
              <button
                className="card-btn addToCardBtn"
                onClick={() => navigate("/pages/CartPage/Cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="card-btn addToCardBtn"
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
