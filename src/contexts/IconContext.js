import { createContext, useContext } from "react";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { BiLogOut, BiLogIn, BiSearch } from "react-icons/bi";
const IconContext = createContext();

export const IconContextProvider = ({ children }) => {
  return (
    <IconContext.Provider
      value={{
        AiOutlineShoppingCart,
        AiOutlineHeart,
        BiLogOut,
        BiLogIn,
        BiSearch,
      }}
    >
      {children}
    </IconContext.Provider>
  );
};

const useIconContext = () => useContext(IconContext);
export default useIconContext;
