import useAddressManagementContext from "../../contexts/AddressManagementcontext";
import useCartContext from "../../contexts/CartContext";
import NavBar from "../../Components/NavBarPage/NavBar"
import "./Address.css";
export default function Address() {
    const { totalBill } = useCartContext();
    const {
        updateAdd,
        deliveryAddress,
        updateInputAddress,
        showNewAddField,
        addNewAdd,
    } = useAddressManagementContext();

    return (
        <div className="cart">
            <NavBar />
            <h2>
                <button className="card-btn" onClick={() => showNewAddField()}>Add Delivery Address</button>
            </h2>            <div className="main-cart">
                <div className="cart-container">
                    <div>

                        <div>
                            {deliveryAddress.initialAddress.map((item, index) => {
                                const { flatNo, BuildingName, Road, City, State } = item;
                                return (
                                    <div className="cart-card" key={flatNo}>
                                        <div className="card-left">
                                            <p>
                                                {" "}
                                                <input type="radio" name="add" />
                                                {flatNo}, {BuildingName}, {Road}, {City}, {State} </p></div>
                                        <div className="cart-right">
                                            <button className="card-btn" onClick={() => updateAdd(index)}>Update Address</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {deliveryAddress.updateAddress ? (
                            <div
                                id="editablePara"
                                className="AddressManagement"
                            >
                                <h4>Update address</h4>
                                <p id="flatNo" contentEditable={true}>
                                    {deliveryAddress.updateAddress
                                        ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate]
                                            .flatNo
                                        : ""}
                                </p>
                                <p id="BuildingName" contentEditable={true}>
                                    {deliveryAddress.updateAddress
                                        ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate]
                                            .BuildingName
                                        : ""}
                                </p>
                                <p id="Road" contentEditable={true}>
                                    {deliveryAddress.updateAddress
                                        ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate]
                                            .Road
                                        : ""}
                                </p>
                                <p id="City" contentEditable={true}>
                                    {deliveryAddress.updateAddress
                                        ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate]
                                            .City
                                        : ""}
                                </p>
                                <p id="State" contentEditable={true}>
                                    {deliveryAddress.updateAddress
                                        ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate]
                                            .State
                                        : ""}
                                </p>
                                <button className="card-btn" onClick={updateInputAddress}>Update</button>
                            </div>
                        ) : undefined}

                        {deliveryAddress.addAddress ? (
                            <div
                                className="AddressManagement"
                            >
                                <h4>Enter new address</h4>
                                <input type="text" id="flatNo" placeholder="flatNo" />
                                <input type="text" id="BuildingName" placeholder="BuildingName" />
                                <input type="text" id="Road" placeholder="Road" />
                                <input type="text" id="City" placeholder="City" />
                                <input type="text" id="State" placeholder="State" />
                                <button
                                    className="card-btn"
                                    onClick={() =>
                                        addNewAdd(
                                            document.querySelector("#flatNo").value,
                                            document.querySelector("#BuildingName").value,
                                            document.querySelector("#Road").value,
                                            document.querySelector("#City").value,
                                            document.querySelector("#State").value
                                        )
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
                            <button className="card-btn">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
