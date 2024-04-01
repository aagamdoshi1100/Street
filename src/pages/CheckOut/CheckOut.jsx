import NavBar from "../../Components/NavBarPage/NavBar";
import useAuthContext from "../../contexts/AuthContext";
import useCartContext from "../../contexts/CartContext";

export default function CheckOut() {
  const { cartItem, totalBill } = useCartContext();
  const { navigate } = useAuthContext();
  return (
    <div>
      <NavBar />
      <div className="checkout-main">
        <img
          className="success"
          src="https://i.gifer.com/7efs.gif"
          width="100%"
          height="200px"
        />
        <div className="checkoutBox">
          <h2>Order has been placed</h2>
          {cartItem.cartArray.map((item) => {
            return (
              <div key={item._id}>
                <p>{item.title}</p>
              </div>
            );
          })}
          <p className="total">Total Amount {totalBill?.price - 1000 + 499}</p>
        </div>
        <div className="checkOut-container">
          <button
            className="card-btn checkout-btn"
            onClick={() => navigate("/pages/ProductPage/ProductPage")}
          >
            Go To Home
          </button>
        </div>
      </div>
    </div>
  );
}
