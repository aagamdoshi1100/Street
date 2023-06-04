import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";

export default function Login(){
    const {setTokenToLocalStorage} = useAuthContext()
    return(<div>
        <h3>Login</h3>
        <label>Email Address</label>
        <input type="text" id="email" value={"a"}/>
        <label>Password</label>
        <input type="text" id="password" value="b"/>
        <button onClick={()=>setTokenToLocalStorage(document.querySelector("#email").value,document.querySelector("#password").value)}>Login</button>
        <NavLink>Create new account {"">""}</NavLink>
    </div>)
}