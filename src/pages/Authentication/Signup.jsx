import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";

export default function Signup() {
    const { createAcc } = useAuthContext()
    return (<div className="auth-container">
        <div className="Brandname">
            <h1>STREET</h1>
        </div>
        <div className="form">
            <h2>Sign up</h2>
            <label>Name</label>
            <input type="text" id="username" />
            <label>Email Address</label>
            <input type="text" id="mail" />
            <label>Password</label>
            <input type="text" id="password" />
            <button onClick={() => createAcc(document.querySelector("#mail").value, document.querySelector("#password").value, document.querySelector("#username").value)}>Create new account</button>
            <NavLink to="/pages/Authentication/Login" >
                Already have an account? Sign in {"" > ""}</NavLink>
        </div>
        <div className="form-footer">
            <p>Ecommerce React App</p>
        </div>
    </div>)
}

