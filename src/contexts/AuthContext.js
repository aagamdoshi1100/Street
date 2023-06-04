import { useState } from "react"
import { useContext,useEffect } from "react"
import { createContext } from "react"

const AuthContext = createContext()

export function AuthContextProvider({children}){
    const [isLoggedIn , setIsloggedIn] = useState(false)

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
            console.log(encodedToken)
            localStorage.setItem("encodedToken",encodedToken)
            setIsloggedIn(true)
        }
        catch(e){
            console.log(e)
        }
    }
    
    useEffect(()=>{ 
        setTokenToLocalStorage()
    },[])
    return(<AuthContext.Provider value={{isLoggedIn,setTokenToLocalStorage,setIsloggedIn}}>
        {children}</AuthContext.Provider>)
}


const useAuthContext =()=> useContext(AuthContext)
export default useAuthContext;

