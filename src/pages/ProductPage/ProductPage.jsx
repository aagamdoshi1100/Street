import Filters from "../../Components/Filters/Filters";
import NavBar from "../../Components/NavBarPage/NavBar";
import Products from "../../Components/Products/Products";
import { useFetchContext } from "../../contexts/FetchContext";
import { useEffect } from "react";
import { TbFilterCog } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./productPage.module.css";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const {
    fetchAllProducts,
    fetchIdsToDisplayStatusOfCartAndWishlist,
    productState,
    filterHandler,
    filteredData,
  } = useFetchContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllProducts();
    fetchIdsToDisplayStatusOfCartAndWishlist();
  }, []);

  console.log(productState, "ps");
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.containerMain}>
        <div className={styles.filtersComponent}>
          {productState.filter.isEnabled && (
            <div className={styles.filterForMobile}>
              <Filters />
            </div>
          )}
          <div className={styles.filterForDesktop}>
            <Filters />
          </div>
        </div>
        <div className={styles.productsSearchbar}>
          <div className={styles.floatingIcon}>
            <AiOutlineShoppingCart
              size="2.0em"
              className={styles.cartIcon}
              onClick={() => navigate(`/users/${user._id}/cart`)}
            />
            <TbFilterCog
              size="2.0em"
              className={styles.filterIcon}
              onClick={filterHandler}
            />
          </div>
          <div>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              <Products
                data={filteredData}
                status={productState.cartAndWishlistStatus}
              />
            ) : (
              <p>0 products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
