import "./App.css";
import Cart from "./pages/CartPage/Cart";
import Landing from "./pages/LandingPage/Landing";
import NavBar from "./pages/NavBarPage/NavBar";
import Product from "./pages/ProductPage/Product";
import Mockman from "mockman-js"
import { Route,Routes } from "react-router-dom";
import WishList from "./pages/WishListPage/WishList";
import RequiresAuth from "./pages/Authentication/RequiresAuth";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import ShowSingleProduct from "./pages/ProductPage/ShowSingleProduct";
import Address from "./pages/AddressPage/Address";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/mockman" element={<Mockman />} />
      <Route path="/pages/ProductPage/ShowSingleProduct" element={<ShowSingleProduct />} />
      <Route path="/pages/AddressPage/Address" element={<Address />}/>
      <Route path="/pages/Authentication/Login" element={<Login />} />
      <Route path="/pages/Authentication/Signup" element={<Signup />} />
      <Route path="/pages/CartPage/Cart" element={<RequiresAuth><Cart /></RequiresAuth>} />
      <Route path="/pages/ProductPage/Product" element={<Product />} />
      <Route path="/pages/WishListPage/WishList" element={<RequiresAuth><WishList /></RequiresAuth>} />
      </Routes>
    </div>
  );
}

export default App;
