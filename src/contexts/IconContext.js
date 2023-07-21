import { createContext, useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const IconContext = createContext();

export const IconContextProvider = ({ children }) => {
  return (
    <IconContext.Provider value={{ AiOutlineShoppingCart }}>
      {children}
    </IconContext.Provider>
  );
};

const useIconContext = () => useContext(IconContext);
export default useIconContext;
