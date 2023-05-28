import "./App.css";
import Cart from "./pages/CartPage/Cart";
import Landing from "./pages/LandingPage/Landing";
import NavBar from "./pages/NavBarPage/NavBar";
import Product from "./pages/ProductPage/Product";
import Mockman from "mockman-js"
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/mockman" element={<Mockman />} />
      <Route path="/pages/CartPage/Cart" element={<Cart />} />
      <Route path="/pages/ProductPage/Product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
