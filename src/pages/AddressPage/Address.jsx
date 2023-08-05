import useAddressManagementContext from "../../contexts/AddressManagementcontext";
import useCartContext from "../../contexts/CartContext";
import NavBar from "../../Components/NavBarPage/NavBar";
import "./Address.css";
import useAuthContext from "../../contexts/AuthContext";
export default function Address() {
  const { totalBill } = useCartContext();
  const { deliveryState, deliveryDispacher, handleInputChange } =
    useAddressManagementContext();
  const { navigate } = useAuthContext();
  return (
    <div className="cart">
      <NavBar />
      <h2>
        <button
          className="card-btn"
          onClick={() =>
            deliveryDispacher({
              type: "NEW_ADD",
              payload: deliveryState.addAddress,
            })
          }
        >
          Add Delivery Address
        </button>
      </h2>{" "}
      <div className="main-cart">
        <div className="cart-container">
          <div>
            <div>
              {deliveryState.initialAddress.map((item, index) => {
                const { flatNo, BuildingName, Road, City, State } = item;
                return (
                  <div className="cart-card" key={flatNo}>
                    <div className="card-left">
                      <p>
                        <input type="radio" name="add" />
                        {`${flatNo} ${BuildingName} ${Road} ${City} ${State}`}{" "}
                      </p>
                    </div>
                    <div className="cart-right">
                      <button
                        className="card-btn"
                        onClick={() =>
                          deliveryDispacher({
                            type: "SELECTED_ADD",
                            payload: index,
                          })
                        }
                      >
                        Update Address
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {deliveryState.updateAddress ? (
              <div id="editablePara" className="AddressManagement">
                <h4>Update address</h4>
                <input
                  id="flatNo"
                  value={
                    deliveryState.initialAddress[deliveryState.selectToUpdate]
                      .flatNo
                  }
                  onChange={(e) => handleInputChange(e, "flatNo")}
                />

                <input
                  id="BuildingName"
                  value={
                    deliveryState.updateAddress
                      ? deliveryState.initialAddress[
                          deliveryState.selectToUpdate
                        ].BuildingName
                      : ""
                  }
                  onChange={(e) => handleInputChange(e, "BuildingName")}
                />

                <input
                  id="Road"
                  value={
                    deliveryState.updateAddress
                      ? deliveryState.initialAddress[
                          deliveryState.selectToUpdate
                        ].Road
                      : ""
                  }
                  onChange={(e) => handleInputChange(e, "Road")}
                />

                <input
                  id="City"
                  value={
                    deliveryState.updateAddress
                      ? deliveryState.initialAddress[
                          deliveryState.selectToUpdate
                        ].City
                      : ""
                  }
                  onChange={(e) => handleInputChange(e, "City")}
                />

                <input
                  id="State"
                  value={
                    deliveryState.updateAddress
                      ? deliveryState.initialAddress[
                          deliveryState.selectToUpdate
                        ].State
                      : ""
                  }
                  onChange={(e) => handleInputChange(e, "State")}
                />
                <button
                  onClick={() => deliveryDispacher({ type: "UPDATE_SUBMIT" })}
                  className="card-btn"
                >
                  Update
                </button>
              </div>
            ) : undefined}

            {deliveryState.addAddress ? (
              <div className="AddressManagement">
                <h4>Enter new address</h4>
                <input
                  type="text"
                  placeholder="flatNo"
                  onChange={(e) =>
                    deliveryDispacher({
                      type: "ADD",
                      payload: { data: e.target.value, act: "flatNo" },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="BuildingName"
                  onChange={(e) =>
                    deliveryDispacher({
                      type: "ADD",
                      payload: { data: e.target.value, act: "BuildingName" },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Road"
                  onChange={(e) =>
                    deliveryDispacher({
                      type: "ADD",
                      payload: { data: e.target.value, act: "Road" },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="City"
                  onChange={(e) =>
                    deliveryDispacher({
                      type: "ADD",
                      payload: { data: e.target.value, act: "City" },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="State"
                  onChange={(e) =>
                    deliveryDispacher({
                      type: "ADD",
                      payload: { data: e.target.value, act: "State" },
                    })
                  }
                />
                <button
                  className="card-btn"
                  onClick={() =>
                    deliveryDispacher({
                      type: "NEW_ADDRESS_ADD",
                      payload: deliveryState.fields,
                    })
                  }
                >
                  Add Address
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="checkout">
          <div className="checkout-card">
            <h3>Price Details</h3>

            <div className="checkout-card-details">
              <p>Price ({totalBill?.qty} items)</p>
              <p> {totalBill?.price} </p>
            </div>
            <div className="checkout-card-details">
              <p>Discount </p>
              <p>-1000</p>
            </div>
            <div className="checkout-card-details">
              <p>Delivery Charges</p>
              <p>499</p>
            </div>
            <div className="checkout-card-details">
              <p>Total Amount</p>
              <p>{totalBill?.price - 1000 + 499}</p>
            </div>
            <div className="checkout-card-offer">
              <p>you will save 1000 Rs on this order</p>
            </div>
            <div className="placeorder">
              <button
                className="card-btn"
                onClick={() => navigate("/CheckOut/CheckOut")}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
