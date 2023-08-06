import "./ProductPage.css";
import Filters from "../../Components/Filters/Filters";
import NavBar from "../../Components/NavBarPage/NavBar";
import Products from "../../Components/Products/Products";
import SearchBar from "../../Components/SearchBar/SearchBar";
import useIconContext from "../../contexts/IconContext";

export default function ProductPage() {
  const { TbFilterCog } = useIconContext();
  return (
    <div className="container">
      <NavBar />
      <div className="container-main">
        <div className="filters-component">
          <Filters />
        </div>
        <div className="products-searchbar">
          <div className="searchbar-component">
            <SearchBar />
            <TbFilterCog size="2.0em" className="filter-icon" />
          </div>
          <div className="products-component">
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
}
