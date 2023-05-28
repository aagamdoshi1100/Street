import useCartContext from "../../contexts/CartContext"
import "./NavBar.css"
import {NavLink} from "react-router-dom"
export default function NavBar(){
    return(<div className="nav-header">
        <div className="navbar-main">
            <div className="navbar-left">
                <NavLink className="link" to="/pages/ProductPage/Product">
                    <h2>AD</h2>
                </NavLink>
            </div>
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search for products" />
            </div>
            <ul className="navbar-right">
               <NavLink className="link" to="/pages/CartPage/Cart">Cart</NavLink>
               <NavLink className="link"to="/pages/WishListPage/WishList">Wishlist</NavLink>
               <NavLink className="link" to="/mockman">Mockman</NavLink>
            </ul>
        </div>
        </div>)
}