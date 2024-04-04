import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBarPage/NavBar";
import "./CheckOut.css";
import useCartContext from "../../contexts/CartContext";
import { useEffect } from "react";

export default function CheckOut() {
  const navigate = useNavigate();
  const { cartItem, placeOrder } = useCartContext();
  const placedItems = cartItem.cartArray.map((pro) => {
    return pro._id;
  });
  useEffect(() => {
    placeOrder(placedItems);
  }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <NavBar />
      <div className="CheckoutContainer">
        <img
          className="success"
          src="https://i.gifer.com/7efs.gif"
          width="100%"
          height="100%"
          alt="success"
        />
        <div className="FinalMessage">
          <h2>Order has been placed</h2>

          <button
            className="BtnToHome"
            onClick={() => navigate(`/users/${user._id}/orders`)}
          >
            Go To Orders
          </button>
        </div>
      </div>
    </div>
  );
}
