import { createContext, useContext, useReducer, useState } from "react";
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
    },
  });
  const filterHandler = () => {
    productDispatcher({
      type: "FILTER_TOGGLER",
    });
  };
  const fetchSeletedProduct = async (productId) => {
    try {
      const getProductById = await fetch(`${API_URL}/products/${productId}`);
      const productData = await getProductById.json();
      productDispatcher({
        type: "SINGLE_PRODUCTS",
        payload: productData.data,
      });
      console.log(getProductById, productData, "single");
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };
  const fetchAllProducts = async () => {
    try {
      const allProducts = await fetch(`${API_URL}/products`);
      const responseProductData = await allProducts.json();
      console.log(allProducts, responseProductData, "fetchAllProducts");
      productDispatcher({
        type: "PRODUCTS",
        payload: responseProductData.data,
      });
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  return (
    <FetchContext.Provider
      value={{
        fetchAllProducts,
        fetchSeletedProduct,
        productState,
        productDispatcher,
        filterHandler,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}

export const useFetchContext = () => useContext(FetchContext);
