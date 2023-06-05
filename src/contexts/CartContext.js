import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react"
import useAuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";
const CartContext = createContext();

export const CartContextProvider = ({children})=>{
    const [cartItem,setCartItem]  = useState({cartArray:[]});

    const totalBill = cartItem?.cartArray?.reduce((acc,cur)=>{
        acc.price  =   Number(acc.price)+Number(cur.price*cur.qty)
        acc.qty  =   acc.qty + cur.qty
        return acc 
    },{price:0,qty:0})

    const qtyControl = async(product,act) =>{
        let productId = product._id
        console.log(productId,"Aaa")
        try{
            let aa = localStorage.getItem("encodedToken")
            const res = await fetch(`/api/user/cart/${productId}`,{
                method:"POST",
                headers: {authorization: aa },
                body:  JSON.stringify({action :{type:act}})
            })
            const cartdetails =await res.json()
            console.log("🚀 ~ file: CartContext.js:22 ~ qtyControl ~ cartdetails:", cartdetails.cart)
            setCartItem({...cartItem, cartArray:cartdetails.cart}) 
        }catch(e){
            console.log(e,"error while removing")
        } 
    }

    const removeFromCart = async(product) =>{
        let productId = product._id
        console.log(productId,"Aaa")
        try{
            let aa = localStorage.getItem("encodedToken")
            const res = await fetch(`/api/user/cart/${productId}`,{
                method:"DELETE",
                headers: {authorization: aa }  
            })
            const cartdetails =await res.json() 
            setCartItem({...cartItem, cartArray:cartdetails.cart})
        }catch(e){
            console.log(e,"error while removing")
        }
    }

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
    return(<CartContext.Provider value={{addToCart,cartItem,setCartItem,qtyControl,removeFromCart,totalBill}}>{children}</CartContext.Provider>)
}


 const useCartContext =()=> useContext(CartContext)

export default useCartContext