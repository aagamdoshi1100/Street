import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";

export default function Signup(){
    const {createAcc} = useAuthContext()
    return(<div>
        <h3>Signup</h3>
        <label>Name</label>
        <input type="text"   id="username" />
        <label>Email Address</label>
        <input type="text"   id="mail"/>
        <label>Password</label>
        <input type="text"   id="password" />
        <button onClick={()=>createAcc(document.querySelector("#mail").value,document.querySelector("#password").value,document.querySelector("#username").value)}>Create new account</button>
        <NavLink to="/pages/Authentication/Login" >Already has an account {"">""}</NavLink>
    </div>)
}

