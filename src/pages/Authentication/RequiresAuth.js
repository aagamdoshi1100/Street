import { Navigate } from "react-router-dom"
import useAuthContext from "../../contexts/AuthContext"

export default function RequiresAuth({children}){
     
    return(localStorage.getItem("encodedToken") ? children : <Navigate to="/pages/Authentication/Login" />)
}