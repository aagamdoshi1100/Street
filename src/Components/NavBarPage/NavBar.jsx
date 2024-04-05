import useAuthContext from "../../contexts/AuthContext";
import { useFetchContext } from "../../contexts/FetchContext";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./navbar.module.css";
import { MdSearch } from "react-icons/md";
import { MdSearchOff } from "react-icons/md";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
import { checkIsUserLoggedIn } from "../utils";

export default function NavBar() {
  const { productDispatcher, productState } = useFetchContext();
  const { signOutHandler } = useAuthContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.navbarMain}>
        <div className={styles.navbarLeft}>
          <h2 className={styles.brandName} onClick={() => navigate("/")}>
            STREET
          </h2>
        </div>
        <div className={styles.searchForDesktop}>
          <SearchBar />
        </div>
        <div className={styles.navbarRight}>
          <AiOutlineShoppingCart
            size="2.0em"
            className={styles.cartIcon}
            onClick={() =>
              checkIsUserLoggedIn(
                navigate,
                `/users/${user?._id}/cart`,
                navigate
              )
            }
          />
          {productState.search.isEnabled ? (
            <MdSearchOff
              className={styles.searchIconForMobile}
              size="2.0em"
              onClick={() => productDispatcher({ type: "TOGGLE_SEARCHBAR" })}
            />
          ) : (
            <MdSearch
              size="2.0em"
              className={styles.searchIconForMobile}
              onClick={() => productDispatcher({ type: "TOGGLE_SEARCHBAR" })}
            />
          )}
          <RiHome2Line
            size="2.0em"
            className={styles.navIcons}
            onClick={() => navigate(`/`)}
          />
          <AiOutlineHeart
            className={styles.navIcons}
            size="2.0em"
            onClick={() =>
              checkIsUserLoggedIn(
                navigate,
                `/users/${user?._id}/wishlist`,
                navigate
              )
            }
          />
          {localStorage.getItem("token") ? (
            <>
              <BiLogOut
                className={styles.navIcons}
                size="2.0em"
                onClick={signOutHandler}
              />
              <div
                className={styles.initials}
                onClick={() => navigate(`/users/${user._id}/profile`)}
              >
                {user.firstname[0]?.toUpperCase()}
              </div>
            </>
          ) : (
            <BiLogIn
              className={styles.navIcons}
              size="2.0em"
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </div>
      {productState.search.isEnabled && (
        <div className={styles.searchComponent}>
          <SearchBar />
        </div>
      )}
    </div>
  );
}
