import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react"
import useAuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";
const CartContext = createContext();

export const CartContextProvider = ({children})=>{
    const [cartItem,setCartItem]  = useState({cartArray:[] });
    const {isLoggedIn} = useAuthContext()
    const addToCart = async(item) =>{
        console.log(item)
        let product = item;
    
        try{
        let aa = localStorage.getItem("encodedToken")
        const res = await fetch("/api/user/cart",{
            method:"POST",
            headers: {authorization: aa },
            body:  JSON.stringify({product}) 
             
        })
        console.log("🚀 ~ file: CartContext.js:21 ~ addToCart ~ res:", res)
       
        }catch(e){
        console.log("🚀 ~ file: CartContext.js:19 ~ addToCart ~ e:", e)
        } 
    
    }
    return(<CartContext.Provider value={{addToCart,cartItem,setCartItem}}>{children}</CartContext.Provider>)
}


 const useCartContext =()=> useContext(CartContext)

export default useCartContext