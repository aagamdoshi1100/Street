import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import FetchContextProvider from "./contexts/FetchContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <FetchContextProvider>
    <App />
    </FetchContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
