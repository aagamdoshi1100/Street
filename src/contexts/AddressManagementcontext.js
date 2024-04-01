import { useReducer, createContext, useContext } from "react";
import AddressManagementReducer, {
  initialAddressValue,
} from "../Reducer/AddressReducer";
import { API_URL } from "../constants";

const AddressManagementContext = createContext();

export const AddressManagementContextProvider = ({ children }) => {
  const [deliveryState, deliveryDispacher] = useReducer(
    AddressManagementReducer,
    initialAddressValue
  );

  const fetchAddresses = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${API_URL}/users/${user._id}/addresses`);
      if (res.ok) {
        const resData = await res.json();
        deliveryDispacher({
          type: "ALL_ADDRESSES",
          payload: resData.addresses,
        });
        console.log(resData, "add");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addAddress = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${API_URL}/users/${user._id}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deliveryState.inputs),
      });
      const resData = await res.json();
      console.log(res, resData, "add");
      if (res.ok) {
        deliveryDispacher({
          type: "ADD_ADDRESSES",
          payload: resData.data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AddressManagementContext.Provider
      value={{ deliveryState, deliveryDispacher, fetchAddresses, addAddress }}
    >
      {children}
    </AddressManagementContext.Provider>
  );
};

const useAddressManagementContext = () => useContext(AddressManagementContext);

export default useAddressManagementContext;
