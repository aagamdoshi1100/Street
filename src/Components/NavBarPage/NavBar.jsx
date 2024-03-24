import useAuthContext from "../../contexts/AuthContext";
import { useFetchContext } from "../../contexts/FetchContext";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./navbar.module.css";
import { MdSearch } from "react-icons/md";
import { MdSearchOff } from "react-icons/md";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";

export default function NavBar() {
  const { productDispatcher, productState } = useFetchContext();
  const { navigate, signOutHandler } = useAuthContext();
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
          <AiOutlineShoppingCart size="2.0em" className={styles.cartIcon} />
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

          <AiOutlineHeart
            className={styles.navIcons}
            size="2.0em"
            onClick={() => navigate("/wishlist")}
          />
          {localStorage.getItem("encodedToken") ? (
            <BiLogOut
              className={styles.navIcons}
              size="2.0em"
              onClick={signOutHandler}
            />
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
