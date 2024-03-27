import { useEffect } from "react";
import { useFetchContext } from "../../contexts/FetchContext";
import { API_URL } from "../../constants";
import "./SearchBar.css";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { productDispatcher, productState } = useFetchContext();
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (productState.search.value !== "") {
        const getSearchResults = await fetch(
          `${API_URL}/products/search/${productState.search.value}`
        );
        const responseData = await getSearchResults.json();
        if (getSearchResults.ok) {
          productDispatcher({
            type: "SET_RESULT",
            payload: responseData,
          });
        }
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [productState.search.value]);

  const clearSearchResults = () => {
    productDispatcher({
      type: "CLEAR_RESULTS",
    });
  };
  const goToProduct = (productId) => {
    productDispatcher({
      type: "VIEW_SEARCHED_PRODUCT",
    });
    navigate(`/products/${productId}`);
  };
  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          className="searchField"
          value={productState.search.value}
          onChange={(e) =>
            productDispatcher({
              type: "SET_VALUE",
              payload: e.target.value,
            })
          }
          placeholder="Search in SREET"
        />
        {productState.search.value.length > 0 && (
          <AiOutlineClose
            size="1.2em"
            className="clearSearchResult"
            onClick={clearSearchResults}
          />
        )}
      </div>
      <div className="results">
        {productState.search.results.map((data) => {
          return (
            <div key={data._id}>
              <p className="resultName" onClick={() => goToProduct(data._id)}>
                {data.Name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
