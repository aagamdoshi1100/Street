import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";

export default function Signup() {
    const { signUp, user, setUser } = useAuthContext();
    return (<div className="auth-container">
        <div className="Brandname">
            <h1>STREET</h1>
        </div>
        <div className="form">
            <h2>Sign up</h2>
            <label>Name</label>
            <input type="text" onChange={(e) => setUser({ ...user, userDetails: { ...user.userDetails, name: e.target.value } })} />
            <label>Email Address</label>
            <input type="text" onChange={(e) => setUser({ ...user, userDetails: { ...user.userDetails, email: e.target.value } })} />
            <label>Password</label>
            <input type="text" onChange={(e) => setUser({ ...user, userDetails: { ...user.userDetails, password: e.target.value } })} />
            <button onClick={signUp}>Create new account</button>
            <NavLink to="/" >
                Already have an account? Sign in {"" > ""}</NavLink>
        </div>
        <div className="form-footer">
            <p>Ecommerce React App</p>
        </div>
    </div>)
}

