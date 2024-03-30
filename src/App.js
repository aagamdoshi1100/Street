import "./App.css";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/CartPage/Cart";
import ProductPage from "./pages/ProductPage/ProductPage";
import WishList from "./pages/WishListPage/WishList";
import RequiresAuth from "./pages/Authentication/RequiresAuth";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Address from "./pages/AddressPage/Address";
import CheckOut from "./pages/CheckOut/CheckOut";
import useAuthContext from "./contexts/AuthContext";
import DetailedView from "./pages/DetailedView/DetailedView";
import Profile from "./pages/Profile/Profile";

function App() {
  const { toast, errDivRef } = useAuthContext();
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users/:userId/profile" element={<Profile />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/products/:productId" element={<DetailedView />} />
        <Route path="/users/:userId/cart" element={<Cart />} />
        <Route path="/users/:userId/wishlist" element={<WishList />} />
        <Route path="/pages/AddressPage/Address" element={<Address />} />
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
