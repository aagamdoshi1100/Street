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
import Orders from "./pages/Orders/Orders";

function App() {
  const { toast, errDivRef } = useAuthContext();
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/users/:userId/profile"
          element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          }
        />
        <Route path="/" element={<ProductPage />} />
        <Route path="/products/:productId" element={<DetailedView />} />
        <Route
          path="/users/:userId/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route
          path="/users/:userId/wishlist"
          element={
            <RequiresAuth>
              <WishList />
            </RequiresAuth>
          }
        />
        <Route
          path="/users/:userId/address"
          element={
            <RequiresAuth>
              <Address />
            </RequiresAuth>
          }
        />
        <Route
          path="/users/:userId/checkout"
          element={
            <RequiresAuth>
              <CheckOut />
            </RequiresAuth>
          }
        />
        <Route
          path="/users/:userId/orders"
          element={
            <RequiresAuth>
              <Orders />
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
