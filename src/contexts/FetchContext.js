import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import FilterReducer from "../Reducer/FilterReducer";
import { useNavigate } from "react-router-dom";

const FetchContext = createContext();

export default function FetchContextProvider({ children }) {
  const navigate = useNavigate();

  const [productState, productDispatcher] = useReducer(FilterReducer, {
    arrProducts: [],
    arrCategories: [],
    ratingSelected: null,
    checkboxes: [],
    selectedRange: null,
    selectedClearFilter: false,
    searchValue: null,
  });
  console.log("🚀 ~ file: FetchContext.js:18 ~ :", productState);

  const { checkboxes } = productState;
  const [singleProduct, setSingleProduct] = useState({ clickedProduct: [] });

  const clearFilter = () => {};

  const sorter = (e) => {
    productDispatcher({
      type: e.target.value,
      payload: productState.arrProducts,
    });
  };
  const showClickedProduct = async (products) => {
    const productId = products._id;
    try {
      const res = await fetch(`/api/products/${productId}`, { method: "GET" });
      const getProduct = await res.json();
      setSingleProduct({
        ...singleProduct,
        clickedProduct: [getProduct.product],
      });
      navigate("/pages/ProductPage/ProductDetailedView/ProductDetails");
    } catch (e) {
      console.error(
        "🚀 ~ file: FetchContext.js:35 ~ showClickedProduct ~ e:",
        e
      );
    }
  };
  const fetching = async () => {
    try {
      const responseProduct = await fetch("/api/products");
      const responseProductData = await responseProduct.json();

      const responseCategories = await fetch("/api/categories");
      const responseCategoriesData = await responseCategories.json();
      productDispatcher({
        type: "PRODUCTS",
        payload: responseProductData.products,
      });
      productDispatcher({
        type: "CATEGORIES",
        payload: responseCategoriesData.categories,
      });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetching();
  }, []);

  const filteredData = (all) => {
    let filtered = [...all];

    if (productState.ratingSelected !== null) {
      filtered = filtered.filter(
        ({ rating }) => rating > Number(productState.ratingSelected)
      );
    }
    if (productState.searchValue !== null) {
      filtered = filtered.filter(({ title }) =>
        title.toLowerCase().includes(productState.searchValue)
      );
    }
    if (productState.checkboxes.length > 0) {
      filtered = filtered.filter(({ type }) =>
        productState.checkboxes.includes(type)
      );
    }
    if (productState.selectedRange !== null) {
      filtered = filtered.filter(
        ({ price }) => Number(price) < productState.selectedRange
      );
    }

    return filtered;
  };
  const data = filteredData(productState.arrProducts);

  return (
    <FetchContext.Provider
      value={{
        checkboxes,
        data,
        clearFilter,
        productState,
        sorter,
        showClickedProduct,
        singleProduct,
        productDispatcher,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}

export const useFetchContext = () => useContext(FetchContext);
