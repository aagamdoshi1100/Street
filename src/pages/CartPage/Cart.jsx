
import { useEffect } from "react"
 import { NavLink } from "react-router-dom"
import useCartContext from "../../contexts/CartContext"
import useWishListContext from "../../contexts/WishListContext";
import { useFetchContext } from "../../contexts/FetchContext";

export default function Cart(){
        const { cartItem,setCartItem,qtyControl,removeFromCart,totalBill } = useCartContext();
        const {addToWishList} = useWishListContext();
        const {showClickedProduct} = useFetchContext()
        const setToCart = async() =>{
            try{ 
            const aa= localStorage.getItem("encodedToken")
            console.log(aa,"ls")
            const res = await fetch("/api/user/cart",{ 
            headers: {authorization : aa} 
            })
            const data = await res.json();
            setCartItem({...cartItem,cartArray: data.cart })
            }catch(e){
                console.log("🚀 ~ file: CartContext.js:19 ~ addToCart ~ e:", e)
            }
        }
        
useEffect(()=>{
    setToCart()
},[])
 
    return(<div className="container">
        
        <div className="box-container">
            <h4>MY CART ({cartItem?.cartArray?.length})</h4>
         {
            cartItem?.cartArray?.map((item)=>{
                const {_id,image,price,rating,title,qty,Material} = item;
                return(<div className="box" key={_id} >
                    <img src={`${image}`} width="100%" height="160px" alt="" onClick={()=>showClickedProduct(item)}/>
                    <p>{title}</p>
                    <p style={{textAlign:"center"}}>{rating}⭐</p>
                    <p>Price: Rs {price}</p>
                    <div>
                    <button onClick={()=>qtyControl(item,"increment")}>+</button> 
                        <div>
                        {qty}
                        </div>
                    {qty > 1 ? <button onClick={()=>qtyControl(item,"decrement")}>-</button> : <button onClick={()=>qtyControl(item,"decrement")} disabled>-</button>}
                    </div>
                    <button onClick={()=>removeFromCart(item)}>Remove From Cart</button>
                    <button onClick={()=>addToWishList(item)}>Add To WishList</button>
                    
                </div>

            )
        })
         }
        </div>{totalBill?.qty > 0 ?
        <div>
            <h4>Price Details</h4>
            <p>Price ({totalBill.qty } items)</p>
            <p> {totalBill.price } </p>
            <p>Discount  </p>
            <p>-1000</p>
            <p>Delivery Charges</p>
            <p>499</p>
            <p>Total Amount</p>
            <p>{totalBill.price-1000+499}</p>
            <p>you will save 1000 Rs on this order</p>
            <button>Place Order</button>            
        </div> : <p></p>} 
    </div>)
}