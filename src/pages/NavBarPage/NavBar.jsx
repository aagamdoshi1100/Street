import { useFetchContext } from "../../contexts/FetchContext"
import "./NavBar.css"
import {NavLink} from "react-router-dom"
export default function NavBar(){
     const {productDispatcher} = useFetchContext();
    return(<div className="nav-header">
        <div className="navbar-main">
            <div className="navbar-left">
                <NavLink className="link" to="/pages/ProductPage/Product">
                    <h2>AD</h2>
                </NavLink>
            </div>
            <div className="search-container">
                <input type="text" className="search-bar" onChange={(e)=>productDispatcher({type:"SERCH_VALUE",payload: e.target.value})} placeholder="Search for products" />
            </div>
            <ul className="navbar-right">
               <NavLink className="link" to="/pages/CartPage/Cart">Cart</NavLink>
               <NavLink className="link"to="/pages/WishListPage/WishList">Wishlist</NavLink>
               <NavLink className="link" to="/mockman">Mockman</NavLink>
            {localStorage.getItem("encodedToken") ? <NavLink className="link" onClick={()=>localStorage.removeItem("encodedToken")} to="/pages/ProductPage/Product">Logout</NavLink> : <NavLink className="link" to="/pages/Authentication/Login" >Login</NavLink>}
            </ul>
        </div>
        </div>)
}