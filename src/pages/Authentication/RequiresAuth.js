import { Navigate } from "react-router-dom"
 
export default function RequiresAuth({children}){
     
    return(localStorage.getItem("encodedToken") ? children : <Navigate to="/pages/Authentication/Login" />)
}