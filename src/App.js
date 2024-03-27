import "./App.css";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/CartPage/Cart";
import Landing from "./pages/LandingPage/Landing";
import ProductPage from "./pages/ProductPage/ProductPage";
import WishList from "./pages/WishListPage/WishList";
import RequiresAuth from "./pages/Authentication/RequiresAuth";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Address from "./pages/AddressPage/Address";
import CheckOut from "./pages/CheckOut/CheckOut";
import useAuthContext from "./contexts/AuthContext";
import DetailedView from "./pages/DetailedView/DetailedView";

function App() {
  const { toast, errDivRef } = useAuthContext();
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/products/:productId" element={<DetailedView />} />
        <Route path="/users/:userId/cart" element={<Cart />} />
        <Route path="/pages/LandingPage/Landing" element={<Landing />} />
        <Route path="/pages/AddressPage/Address" element={<Address />} />
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
      <p
        className="notify"
        ref={errDivRef}
        style={{ display: toast ? "block" : "none" }}
      ></p>
    </div>
  );
}

export default App;
