import { useReducer, createContext, useContext } from "react";
import AddressManagementReducer, {
  initialAddressValue,
} from "../Reducer/AddressReducer";

const AddressManagementContext = createContext();

export const AddressManagementContextProvider = ({ children }) => {
  const [deliveryState, deliveryDispacher] = useReducer(
    AddressManagementReducer,
    initialAddressValue
  );

  const handleInputChange = (e, act) => {
    deliveryDispacher({
      type: "UPDATE",
      payload: { data: e.target.value, act },
    });
  };

  return (
    <AddressManagementContext.Provider
      value={{ deliveryState, deliveryDispacher, handleInputChange }}
    >
      {children}
    </AddressManagementContext.Provider>
  );
};

const useAddressManagementContext = () => useContext(AddressManagementContext);

export default useAddressManagementContext;
