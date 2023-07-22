import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import "./Authentication.css"

export default function Login() {
    const { setTokenToLocalStorage } = useAuthContext()
    return (<div className="auth-container">
        <div className="Brandname">
            <h1>STREET</h1>
        </div>
        <div className="form">
            <h2>Sign in</h2>
            <label>Email Address</label>
            <input type="text" id="email" />
            <label>Password</label>
            <input type="text" id="password" />
            <button onClick={() => setTokenToLocalStorage(document.querySelector("#email").value, document.querySelector("#password").value)}>Login</button>
            <NavLink to="/pages/Authentication/Signup">Don't have an account? Sign up {"" > ""}</NavLink>
        </div>
        <div className="form-footer">
            <p>Ecommerce React App</p>
        </div>
    </div>)
}   