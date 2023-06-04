import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
 
const WishListContext = createContext();

export const WishListContextProvider = ({children})=>{
    const myToken = localStorage.getItem("encodedToken")
    const [wishListItem,setWishListItem]  = useState({WishListArray:[]})
    const addToWishList = async(product) =>{
        try{
        const res = await fetch("/api/user/wishlist",{
            method:"POST",
            headers: {authorization: myToken },
            body:  JSON.stringify({product}) 
             
        })
        console.log("🚀 ~ file: CartContext.js:21 ~ addToCart ~ res:", res)

        }catch(e){
            console.log("🚀 ~ file: CartContext.js:19 ~ addToCart ~ e:", e)
        }
    }

    const removeFromWishList =async(product)=>{
        const productId = product._id
        try{
            const res = await fetch(`/api/user/wishlist/${productId}`,{
                method:"DELETE",
                headers:{authorization: myToken }
            })
 
              setWishListItem({...wishListItem,WishListArray: res.json().wishlist})
        }catch(e){
            console.log("🚀 ~ file: WishListContext.js:33 ~ removeFromWishList ~ e:", e) 
        }
    }

    const moveToCart=()=>{}
    return(<WishListContext.Provider value={{addToWishList,wishListItem,setWishListItem,removeFromWishList,moveToCart}}>{children}</WishListContext.Provider>)
}


 const useWishListContext =()=> useContext(WishListContext)

export default useWishListContext;