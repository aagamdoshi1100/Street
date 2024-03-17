import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import FetchContextProvider from "./contexts/FetchContext";
import { CartContextProvider } from "./contexts/CartContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { WishListContextProvider } from "./contexts/WishListContext";
import { AddressManagementContextProvider } from "./contexts/AddressManagementcontext";
import { IconContextProvider } from "./contexts/IconContext";

const root = createRoot(document.getElementById("root"));

root.render(
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
  </React.StrictMode>
);
