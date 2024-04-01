import { useState } from "react";
import useAddressManagementContext from "../../contexts/AddressManagementcontext";
import styles from "./address.module.css";
import { validateAddressInputs } from "../../Components/utils";

function Form() {
  const { deliveryState, deliveryDispacher, addAddress } =
    useAddressManagementContext();
  const [errors, setErrors] = useState({});
  const validateAddressForm = () => {
    const isValid = validateAddressInputs(deliveryState, setErrors);
    if (isValid) {
      addAddress();
    }
  };
  return (
    <div className={styles.addContainer}>
      <div className={styles.addressForm}>
        <h2>Fill up Address</h2>
        <label>Address:</label>
        <textarea
          rows="2"
          placeholder="Enter your address"
          value={deliveryState.inputs.address}
          onChange={(e) =>
            deliveryDispacher({
              type: "INPUT_HANDLER",
              payload: { key: "address", value: e.target.value },
            })
          }
        />
        {errors.address && <p className={styles.error}>{errors.address}</p>}

        <label>City:</label>
        <input
          type="text"
          placeholder="Enter your city"
          value={deliveryState.inputs.city}
          onChange={(e) =>
            deliveryDispacher({
              type: "INPUT_HANDLER",
              payload: { key: "city", value: e.target.value },
            })
          }
        />
        {errors.city && <p className={styles.error}>{errors.city}</p>}

        <label>State:</label>
        <input
          type="text"
          placeholder="Enter your state"
          value={deliveryState.inputs.state}
          onChange={(e) =>
            deliveryDispacher({
              type: "INPUT_HANDLER",
              payload: { key: "state", value: e.target.value },
            })
          }
        />
        {errors.state && <p className={styles.error}>{errors.state}</p>}

        <label>Postal Code:</label>
        <input
          type="number"
          placeholder="Enter your postal code"
          value={deliveryState.inputs.postalcode}
          onChange={(e) =>
            deliveryDispacher({
              type: "INPUT_HANDLER",
              payload: { key: "postalcode", value: e.target.value },
            })
          }
        />
        {errors.postalcode && (
          <p className={styles.error}>{errors.postalcode}</p>
        )}
        <div>
          <button onClick={validateAddressForm}>Submit</button>
          <button
            className={styles.cancelbtn}
            onClick={() =>
              deliveryDispacher({
                type: "TOGGLE_ADDRESS_FORM",
              })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
