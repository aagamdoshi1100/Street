import Filters from "../../Components/Filters/Filters";
import NavBar from "../../Components/NavBarPage/NavBar";
import Products from "../../Components/Products/Products";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useFetchContext } from "../../contexts/FetchContext";
import { useEffect } from "react";
import { TbFilterCog } from "react-icons/tb";
import styles from "./productPage.module.css";

export default function ProductPage() {
  const { fetchAllProducts, productState, filterHandler } = useFetchContext();

  useEffect(() => {
    fetchAllProducts();
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
          <div>
            <SearchBar />
            <TbFilterCog
              size="2.0em"
              className={styles.filterIcon}
              onClick={filterHandler}
            />
          </div>
          <div>
            {Array.isArray(productState.arrProducts) &&
            productState.arrProducts.length > 0 ? (
              <Products data={productState.arrProducts} />
            ) : (
              <p>0 products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
