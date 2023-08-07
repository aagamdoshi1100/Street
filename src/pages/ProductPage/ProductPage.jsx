import "./ProductPage.css";
import Filters from "../../Components/Filters/Filters";
import NavBar from "../../Components/NavBarPage/NavBar";
import Products from "../../Components/Products/Products";
import SearchBar from "../../Components/SearchBar/SearchBar";
import useIconContext from "../../contexts/IconContext";
import { useState } from "react";

export default function ProductPage() {
  const [toggle, setToggle] = useState(false);

  const myStyle = {
    backgroundColor: toggle ? "rgb(249 242 242)" : "",
    display: toggle ? "block" : window.innerWidth < 768 ? "none" : "block",
    zIndex: toggle ? 20 : 0,
  };

  const { TbFilterCog } = useIconContext();
  return (
    <div className="container">
      <NavBar />
      <div className="container-main">
        <div className="filters-component" style={myStyle}>
          <Filters />
        </div>
        <div className="products-searchbar">
          <div className="searchbar-component">
            <SearchBar />
            <TbFilterCog
              size="2.0em"
              onClick={() => setToggle(!toggle)}
              className="filter-icon"
            />
          </div>
          <div className="products-component">
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
}
