import useCartContext from "../../contexts/CartContext";
import { useFetchContext } from "../../contexts/FetchContext"

export default function ShowSingleProduct(){
    const {singleProduct} = useFetchContext();
    const {addToCart,cartItem} = useCartContext()
    return(<div  className="product-cards">
       {
            singleProduct?.clickedProduct.map((item)=>{
                const {_id,image,price,rating,title,Material} = item;
                return(<div  className="box" key={_id}>
                    <h3>W</h3>
                    <img src={`${image}`} width="100%" height="160px" alt="" />
                    <p>{title}</p>
                    <p style={{textAlign:"center"}}>{rating}⭐</p>
                    <p>Price: Rs {price}</p>
                    {cartItem?.cartArray?.find((thing)=>thing._id === _id) ? <button>Go to Cart</button> :
                     <button className="box-btn" onClick={()=>addToCart(item)}>Add to Cart</button> }  
                </div>)
            })
       }
    </div>)
}