
import { useEffect } from "react" 
import useWishListContext from "../../contexts/WishListContext"
import { useFetchContext } from "../../contexts/FetchContext"

export default function WishList(){
        const {wishListItem,setWishListItem,removeFromWishList,moveToCart} = useWishListContext()
        const {showClickedProduct} = useFetchContext()
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
                    <p onClick={()=>removeFromWishList(item)}>W</p>
                    <img src={`${image}`} width="100%" height="160px" alt=""  onClick={()=>showClickedProduct(item)}/>
                    <p>{title}</p>
                    <p style={{textAlign:"center"}}>{rating}⭐</p> 
                    <p>Price: Rs {price}</p>
                    <button onClick={()=>moveToCart(item,"increment")}>Move To Cart</button>
                </div>
            )
        })
         }
        </div>
    </div>)
}