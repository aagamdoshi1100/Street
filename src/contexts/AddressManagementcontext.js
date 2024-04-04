import { useReducer, createContext, useContext } from "react";
import AddressManagementReducer, {
  initialAddressValue,
} from "../Reducer/AddressReducer";
import { API_URL } from "../constants";
import useAuthContext from "./AuthContext";

const AddressManagementContext = createContext();

export const AddressManagementContextProvider = ({ children }) => {
  const [deliveryState, deliveryDispacher] = useReducer(
    AddressManagementReducer,
    initialAddressValue
  );
  const { notificationHandler } = useAuthContext();
  const fetchAddresses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${API_URL}/users/${user._id}/addresses`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const resData = await res.json();
      if (res.ok) {
        deliveryDispacher({
          type: "ALL_ADDRESSES",
          payload: resData.addresses,
        });
      } else {
        throw resData;
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const addAddress = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${API_URL}/users/${user._id}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(deliveryState.inputs),
      });
      const resData = await res.json();
      if (res.ok) {
        deliveryDispacher({
          type: "ADD_ADDRESSES",
          payload: resData.data,
        });
      } else {
        throw resData;
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
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
