import { useNavigate } from "react-router-dom";
import useAddressManagementContext from "../../contexts/AddressManagementcontext";
import useCartContext from "../../contexts/CartContext";
import NavBar from "../../Components/NavBarPage/NavBar";
import styles from "./address.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useEffect } from "react";
import Form from "./Form";

export default function Address() {
  const { totalBill, cartItem } = useCartContext();
  const { deliveryState, deliveryDispacher, fetchAddresses } =
    useAddressManagementContext();
  const navigate = useNavigate();
  useEffect(() => {
    fetchAddresses();
  }, []);
  console.log(deliveryState, cartItem, totalBill, "DL");
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Address Book</h3>
          <FaPlus
            className="addBtn"
            onClick={() =>
              deliveryDispacher({
                type: "TOGGLE_ADDRESS_FORM",
              })
            }
          />
        </div>
        {deliveryState.toggle.isEnabled && <Form />}
        <div className="addresses">
          {Array.isArray(deliveryState.addresses) &&
          deliveryState.addresses.length > 0 ? (
            deliveryState.addresses.map((item, index) => (
              <p key={item._id} className={styles.add}>
                <input
                  type="radio"
                  className={styles.addSelector}
                  name="add"
                  value={item}
                  onChange={(e) =>
                    deliveryDispacher({
                      type: "SET_DELIVERY_ADD",
                      payload: item,
                    })
                  }
                />
                {item.address}, {item.city},{item.state}-{item.postalcode}
              </p>
            ))
          ) : (
            <p>No Address found</p>
          )}
        </div>
        {totalBill?.qtyOfsameProductInCart > 0 && (
          <div className={styles.checkoutBox}>
            <h3>Checkout Details</h3>
            <div className={styles.checkoutPoint}>
              <p>Total Price </p>
              <p> {totalBill?.Price} </p>
            </div>
            <div className={styles.checkoutPoint}>
              <p>Discount </p>
              <p>-1000</p>
            </div>
            <div className={styles.checkoutPoint}>
              <p>Delivery Charges</p>
              <p>50</p>
            </div>
            <div className={styles.checkoutPoint}>
              <p>Total Amount</p>
              <p>{totalBill?.Price - 1000 + 50}</p>
            </div>
            <div className={styles.checkoutPoint}>
              <p>Delivery Address</p>
            </div>
            {deliveryState.addresses.length > 0 ? (
              <div className={styles.checkoutPoint}>
                {deliveryState?.deliveryAddress.address},
                {deliveryState?.deliveryAddress.city},
                {deliveryState?.deliveryAddress.state}-
                {deliveryState?.deliveryAddress.postalcode}
              </div>
            ) : (
              <p>-</p>
            )}
            <div className="checkout-card-offer">
              <p>You will save 1000 Rs on this order</p>
            </div>
            <div className={styles.placeOrderContainer}>
              <button
                className={styles.placeOrder}
                onClick={() => navigate("/users/:userId/checkout")}
              >
                Check out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
