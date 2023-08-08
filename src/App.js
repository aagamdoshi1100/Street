import "./App.css";
import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";
import Cart from "./pages/CartPage/Cart";
import Landing from "./pages/LandingPage/Landing";
import ProductPage from "./pages/ProductPage/ProductPage";
import WishList from "./pages/WishListPage/WishList";
import RequiresAuth from "./pages/Authentication/RequiresAuth";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Address from "./pages/AddressPage/Address";
import ProductDetails from "./pages/ProductPage/ProductDetailedView/ProductDetails";
import CheckOut from "./pages/CheckOut/CheckOut";
import useAuthContext from "./contexts/AuthContext";

function App() {
  const { toast, setToast } = useAuthContext();
  return (
    <div className="App">
      <Routes>
        <Route path="/pages/LandingPage/Landing" element={<Landing />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route
          path="/pages/ProductPage/ProductDetailedView/ProductDetails"
          element={<ProductDetails />}
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
        <Route
          path="/pages/ProductPage/Productpage"
          element={<ProductPage />}
        />
        <Route
          path="/pages/WishListPage/WishList"
          element={
            <RequiresAuth>
              <WishList />
            </RequiresAuth>
          }
        />
        <Route
          path="/CheckOut/CheckOut"
          element={
            <RequiresAuth>
              <CheckOut />
            </RequiresAuth>
          }
        />
      </Routes>
      <div
        className="notify"
        id="notify"
        style={{ display: toast ? "block" : "none" }}
      ></div>
    </div>
  );
}

export default App;
