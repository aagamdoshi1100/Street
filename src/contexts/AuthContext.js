import { useState } from "react"
import { useContext,useEffect } from "react"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export function AuthContextProvider({children}){
    const [isLoggedIn , setIsloggedIn] = useState(false)
     
    const navigate = useNavigate()
    

    const createAcc =async(mail,pass,user)=>{
        try{
        const res = await fetch("/api/auth/signup",{method:"POST",body:JSON.stringify({email :mail,password:pass,someUserAttribute1:user})})
        const {encodedToken} =  await res.json()  
        // localStorage.setItem("encodedToken", encodedToken)
        navigate("/pages/Authentication/Login")
        }catch(e){
            console.log("🚀 ~ file: AuthContext.js:15 ~ createAcc ~ e:", e)
            
        }
    }

    const setTokenToLocalStorage = async(user,pass)=>{
        console.log("🚀 ~ file: AuthContext.js:11 ~ setTokenToLocalStorage ~ user,pass:", user,pass)
        try{
            const cred=  {
                email: user,
                password: pass
            }       
            const restoken = await fetch("/api/auth/login",{
                method: "POST",
                body : JSON.stringify(cred)
            })
            const {encodedToken} =  await restoken.json() 
            localStorage.setItem("encodedToken",encodedToken)
            setIsloggedIn(true)
        }
        catch(e){
            console.log(e)
        }
    }
    
    return(<AuthContext.Provider value={{isLoggedIn,setTokenToLocalStorage,setIsloggedIn,createAcc}}>
        {children}</AuthContext.Provider>)
}


const useAuthContext =()=> useContext(AuthContext)
export default useAuthContext;

