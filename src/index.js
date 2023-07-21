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
import { AddressManagementContextProvider } from "./contexts/AddressManagementcontext";
import { IconContextProvider } from "./contexts/IconContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <IconContextProvider>
        <AuthContextProvider>
          <FetchContextProvider>
            <CartContextProvider>
              <WishListContextProvider>
                <AddressManagementContextProvider>
                  <App />
                </AddressManagementContextProvider>
              </WishListContextProvider>
            </CartContextProvider>
          </FetchContextProvider>
        </AuthContextProvider>
      </IconContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
