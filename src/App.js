import "./App.css";
import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";
import Cart from "./pages/CartPage/Cart";
import Landing from "./pages/LandingPage/Landing";
import Product from "./pages/ProductPage/Product";
import WishList from "./pages/WishListPage/WishList";
import RequiresAuth from "./pages/Authentication/RequiresAuth";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import ShowSingleProduct from "./pages/ProductPage/ShowSingleProduct";
import Address from "./pages/AddressPage/Address";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/pages/LandingPage/Landing" element={<Landing />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route
          path="/pages/ProductPage/ShowSingleProduct"
          element={<ShowSingleProduct />}
        />
        <Route path="/pages/AddressPage/Address" element={<Address />} />
        <Route path="/" element={<Login />} />
        <Route path="/pages/Authentication/Signup" element={<Signup />} />
        <Route
          path="/pages/CartPage/Cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route path="/ProductPage/Product" element={<Product />} />
        <Route
          path="/pages/WishListPage/WishList"
          element={
            <RequiresAuth>
              <WishList />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
