import useCartContext from "../../../contexts/CartContext";
import { useFetchContext } from "../../../contexts/FetchContext"
import useWishListContext from "../../../contexts/WishListContext";
import NavBar from "../../../Components/NavBarPage/NavBar"
import "./ProductDetails.css"

export default function ProductDetails() {
    const { singleProduct } = useFetchContext();
    const { addToCart, cartItem } = useCartContext();
    const { addToWishList } = useWishListContext();
    return (<div className="product-cards">
        <NavBar />
        {
            singleProduct?.clickedProduct.map((item) => {
                const { _id, image, price, rating, title, Material } = item;
                return (<div className="box" key={_id}>
                    <div className="img-container">
                        <img src={`${image}`} width="100%" height="100%" alt="" />
                    </div>
                    <div className="description">
                        <p className="productName">{title}</p>
                        <div className="material">{Material}</div>
                        <h3>{rating}⭐</h3>
                        <h3>Price: Rs {price}</h3>
                        <div className="btns">
                            {cartItem?.cartArray?.find((thing) => thing._id === _id) ? <button className="card-btn card-btn-single">Go to Cart</button> :
                                <button className="card-btn card-btn-single" onClick={() => addToCart(item)}>Add to Cart</button>}
                            <button className="card-btn card-btn-single" onClick={() => addToWishList(item)}>Add to Wishlist</button>
                        </div>
                    </div>
                </div>)
            })
        }
    </div>)
}   