import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import FetchContextProvider from "./contexts/FetchContext";
import { CartContextProvider } from "./contexts/CartContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { WishListContextProvider } from "./contexts/WishListContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
        <FetchContextProvider>
            <CartContextProvider>
              <WishListContextProvider>
                  <App />
               </WishListContextProvider>
            </CartContextProvider>
        </FetchContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
