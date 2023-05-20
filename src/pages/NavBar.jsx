import {NavLink} from "react-router-dom"
export default function NavBar(){
    return(<div><nav  style={{display:"flex"}}>
        <h2>AD</h2>
        <NavLink to="#">Cart</NavLink>
        <NavLink to="#">Wishlist</NavLink>
        {/* <NavLink to="#">Cart</NavLink> */}
        </nav></div>)
}