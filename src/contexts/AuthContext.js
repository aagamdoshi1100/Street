import { useContext,useEffect } from "react"
import { createContext } from "react"

const AuthContext = createContext()

export function AuthContextProvider({children}){
    const setTokenToLocalStorage = async()=>{
        try{
            const cred=  {
                email: "adarshbalika@gmail.com",
                password: "adarshbalika"
            }       
            const restoken = await fetch("/api/auth/login",{
                method: "POST",
                body : JSON.stringify(cred)
            })
            const {encodedToken} =  await restoken.json()
            console.log(encodedToken)
            localStorage.setItem("encodedToken",encodedToken)
        }
        catch(e){
            console.log(e)
        }
    }
    
    useEffect(()=>{ 
        setTokenToLocalStorage()
    },[])
    return(<AuthContext.Provider value={{}}>
        {children}</AuthContext.Provider>)
}


const useAuthContext =()=> useContext(AuthContext)
export default useAuthContext;

