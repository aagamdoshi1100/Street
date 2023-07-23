import "./Product.css"
import { useFetchContext } from "../../contexts/FetchContext"
import useCartContext from "../../contexts/CartContext"
import useWishListContext from "../../contexts/WishListContext"
import Filters from "../../Components/Filters/Filters"
import NavBar from "../../Components/NavBarPage/NavBar"
import useIconContext from "../../contexts/IconContext"

export default function Product() {
    const { data, showClickedProduct } = useFetchContext();
    const { addToCart, cartItem } = useCartContext();
    const { addToWishList } = useWishListContext();
    const { AiOutlineHeart } = useIconContext();

    return (<div className="parent-container">
        <NavBar />
        <div className="main-container">
            <div className="filters-container">
                <Filters />
            </div>

            <div className="products-container">
                {data.map((item) => {
                    const { _id, image, price, rating, title, Material } = item;
                    return (<div className="card" key={_id}>
                        <AiOutlineHeart className="wishlist" onClick={() => addToWishList(item)} />
                        <img src={`${image}`} width="100%" height="200px" alt="" onClick={() => showClickedProduct(item)} />
                        <p >{title}</p>
                        <p>{rating}⭐</p>
                        <p>Price: Rs {price}</p>
                        {cartItem?.cartArray?.find((thing) => thing._id === _id) ?
                            <button className="card-btn">Go to Cart</button> :
                            <button className="card-btn" onClick={() => addToCart(item)}>Add to Cart</button>}

                    </div>

                    )
                })
                }

            </div>
        </div>
    </div >)

}
