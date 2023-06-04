import { Navigate } from "react-router-dom"
import useAuthContext from "../../contexts/AuthContext"

export default function RequiresAuth({children}){
    const {isLoggedIn} = useAuthContext()
    return(isLoggedIn ? children : <Navigate to="/pages/Authentication/Login" />)
}