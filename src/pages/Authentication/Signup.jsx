import { NavLink } from "react-router-dom";

export default function Signup(){
    return(<div>
        <h3>Signup</h3>
        <label>Email Address</label>
        <input type="text" />
        <label>Password</label>
        <input type="text" />
        <button>Create new account</button>
        <NavLink>Already has an account {"">""}</NavLink>
    </div>)
}