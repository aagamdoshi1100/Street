
import { useEffect } from "react"
 import { NavLink } from "react-router-dom"
import useWishListContext from "../../contexts/WishListContext"
 

export default function WishList(){
        const {wishListItem,setWishListItem} = useWishListContext()
        const setToWishList = async() =>{
            try{ 
            const aa= localStorage.getItem("encodedToken")
            console.log(aa,"ls")
            const res = await fetch("/api/user/wishlist",{ 
            headers: {authorization : aa} 
            })
            const data = await res.json();
            setWishListItem({...wishListItem,WishListArray: data.wishlist })
            }catch(e){
                console.log( e)
            }
        }
        
useEffect(()=>{
    setToWishList()
},[])
 
    return(<div className="container">
        <h3>WishList page</h3>
        <div className="box-container">
         {
            wishListItem?.WishListArray?.map((item)=>{
                const {_id,image,price,rating,title,Material} = item;
                return(<div className="box" key={_id}>
                    <img src={`${image}`} width="100%" height="160px" alt="" />
                    <p>{title}</p>
                    <p style={{textAlign:"center"}}>{rating}⭐</p>

                    <p>Price: Rs {price}</p>
                
                </div>

            )
        })
         }
        </div>
    </div>)
}