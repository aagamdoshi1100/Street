import { createContext, useContext, useReducer } from "react";
import FetchReducer from "../Reducer/FetchReducer";
import useAuthContext from "./AuthContext";
import { API_URL } from "../constants";

const FetchContext = createContext();

export default function FetchContextProvider({ children }) {
  const { notificationHandler } = useAuthContext();
  const [productState, productDispatcher] = useReducer(FetchReducer, {
    arrProducts: [],
    selectedProduct: [],
    filter: {
      isEnabled: false,
      ratingSelected: null,
      sortBy: "",
      range: {
        low: "",
        high: "",
      },
      categoryCheckboxes: [],
    },
    search: {
      isEnabled: false,
      value: "",
      results: [],
    },
    cartAndWishlistStatus: {
      cartStatus: [],
      wishlistStatus: [],
    },
    loading: {
      mainPageLoading: false,
      selectedProduct: false,
    },
  });
  const filterHandler = () => {
    productDispatcher({
      type: "FILTER_TOGGLER",
    });
  };
  const fetchSeletedProduct = async (productId) => {
    try {
      productDispatcher({ type: "LOADING_SINGLE_PRODUCT" });
      const getProductById = await fetch(`${API_URL}/products/${productId}`);
      if (getProductById.ok) {
        const productData = await getProductById.json();
        productDispatcher({
          type: "SINGLE_PRODUCTS",
          payload: productData.data,
        });
        productDispatcher({ type: "LOADING_SINGLE_PRODUCT" });
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };
  const fetchAllProducts = async () => {
    try {
      productDispatcher({ type: "LOADING" });
      const allProducts = await fetch(`${API_URL}/products`);
      const responseProductData = await allProducts.json();
      productDispatcher({
        type: "PRODUCTS",
        payload: responseProductData.data,
      });
      productDispatcher({ type: "LOADING" });
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const fetchIdsToDisplayStatusOfCartAndWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        const allProducts = await fetch(
          `${API_URL}/users/${user._id}/cartAndWishlistIds`,
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        const responseProductData = await allProducts.json();
        if (allProducts.ok) {
          productDispatcher({
            type: "FETCH_TO_DISPLAY",
            payload: responseProductData,
          });
        } else {
          throw responseProductData;
        }
      } catch (err) {
        console.error(err);
        user && notificationHandler(err.message);
      }
    }
  };

  const productsFilterHandler = (all) => {
    let filtered = [...all];

    if (productState.filter.range.low !== "") {
      filtered = filtered.filter(
        ({ Price, Discount }) =>
          Number(Price - (Price * Discount) / 100) >=
          Number(productState.filter.range.low)
      );
    }
    if (productState.filter.range.high !== "") {
      filtered = filtered.filter(
        ({ Price, Discount }) =>
          Number(Price - (Price * Discount) / 100) <=
          Number(productState.filter.range.high)
      );
    }
    if (productState.filter.categoryCheckboxes.length > 0) {
      filtered = filtered.filter(({ Category }) =>
        productState.filter.categoryCheckboxes.includes(Category)
      );
    }
    if (productState.filter.ratingSelected !== null) {
      filtered = filtered.filter(
        ({ Rating }) => Rating >= Number(productState.filter.ratingSelected)
      );
    }
    if (productState.filter.sortBy === "HTL") {
      filtered = [
        ...filtered.sort((a, b) => {
          const discountedPriceA =
            a.Price - Math.floor((a.Price * a.Discount) / 100);
          const discountedPriceB =
            b.Price - Math.floor((b.Price * b.Discount) / 100);
          return discountedPriceB - discountedPriceA;
        }),
      ];
    }
    if (productState.filter.sortBy === "LTH") {
      filtered = [
        ...filtered.sort((a, b) => {
          const discountedPriceA =
            a.Price - Math.floor((a.Price * a.Discount) / 100);
          const discountedPriceB =
            b.Price - Math.floor((b.Price * b.Discount) / 100);
          return discountedPriceA - discountedPriceB;
        }),
      ];
    }
    return filtered;
  };
  const filteredData = productsFilterHandler(productState.arrProducts);

  return (
    <FetchContext.Provider
      value={{
        fetchAllProducts,
        fetchIdsToDisplayStatusOfCartAndWishlist,
        fetchSeletedProduct,
        productState,
        filteredData,
        productDispatcher,
        filterHandler,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}

export const useFetchContext = () => useContext(FetchContext);
