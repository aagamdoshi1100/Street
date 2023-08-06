import useAuthContext from "../../contexts/AuthContext";
import { useFetchContext } from "../../contexts/FetchContext";
import useIconContext from "../../contexts/IconContext";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
export default function NavBar() {
  const { productDispatcher } = useFetchContext();
  const { AiOutlineShoppingCart, AiOutlineHeart, BiLogOut, BiLogIn, BiSearch } =
    useIconContext();
  const { navigate, signOutHandler } = useAuthContext();

  return (
    <div className="nav-header">
      <div className="navbar-main">
        <div className="navbar-left">
          <h2 onClick={() => navigate("/pages/ProductPage/ProductPage")}>STREET</h2>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            onChange={(e) =>
              productDispatcher({
                type: "SERCH_VALUE",
                payload: e.target.value,
              })
            }
            placeholder="Search for products"
          />
        </div>
        <div className="navbar-right">
          <AiOutlineShoppingCart
            className="nav-icons"
            onClick={() => navigate("/pages/CartPage/Cart")}
          />
          <AiOutlineHeart
            className="nav-icons"
            onClick={() => navigate("/pages/WishListPage/WishList")}
          />
          {localStorage.getItem("encodedToken") ? (
            <BiLogOut className="nav-icons" onClick={signOutHandler} />
          ) : (
            <BiLogIn
              className="nav-icons"
              onClick={() => navigate("/pages/Authentication/Login")}
            />
          )}

          {/* <NavLink className="link" to="/mockman">Mockman</NavLink> */}
        </div>
      </div>
    </div>
  );
}
