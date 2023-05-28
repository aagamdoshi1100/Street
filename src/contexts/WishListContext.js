import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
 
const WishListContext = createContext();

export const WishListContextProvider = ({children})=>{
    const [wishListItem,setWishListItem]  = useState({WishListArray:[]})
    const addToWishList = async(item) =>{
        console.log(item)
        let product = item;
        try{
        let aa = localStorage.getItem("encodedToken")
        const res = await fetch("/api/user/wishlist",{
            method:"POST",
            headers: {authorization: aa },
            body:  JSON.stringify({product}) 
             
        })
        console.log("🚀 ~ file: CartContext.js:21 ~ addToCart ~ res:", res)

        }catch(e){
            console.log("🚀 ~ file: CartContext.js:19 ~ addToCart ~ e:", e)
        }
    }
    return(<WishListContext.Provider value={{addToWishList,wishListItem,setWishListItem}}>{children}</WishListContext.Provider>)
}


 const useWishListContext =()=> useContext(WishListContext)

export default useWishListContext;