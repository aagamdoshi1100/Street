import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBarPage/NavBar";
import "./CheckOut.css";

export default function CheckOut() {
  const navigate = useNavigate();
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

          <button className="BtnToHome" onClick={() => navigate("/")}>
            Go To Home
          </button>
        </div>
      </div>
    </div>
  );
}
