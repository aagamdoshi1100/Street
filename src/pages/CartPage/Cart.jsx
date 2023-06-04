
import { useEffect } from "react"
 import { NavLink } from "react-router-dom"
import useCartContext from "../../contexts/CartContext"

export default function Cart(){
        const { cartItem,setCartItem,qtyControl,removeFromCart } = useCartContext();
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
                return(<div className="box" key={_id}>
                    <img src={`${image}`} width="100%" height="160px" alt="" />
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
                    <button>Add To WishList</button>
                    
                </div>

            )
        })
         }
        </div>
    </div>)
}