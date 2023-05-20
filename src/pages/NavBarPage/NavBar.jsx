import "./NavBar.css"
import {NavLink} from "react-router-dom"
export default function NavBar(){
    return(<div className="nav-header">
      <ul className="navbar">
        <div className="navbar-main">
            <div className="navbar-left">
                <NavLink>
                    <h2>AD</h2>
                </NavLink>
            </div>
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search for products" />
            </div>
            <ul className="navbar-right">
               <NavLink to="#">Cart</NavLink>
               <NavLink to="#">Wishlist</NavLink>
            </ul>
        </div>
      </ul>
        </div>)
}