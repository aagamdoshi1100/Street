import { createContext, useContext } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { BiLogOut, BiLogIn, BiSearch } from "react-icons/bi";
import { TbFilterCog } from "react-icons/tb";
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
        TbFilterCog,
        AiOutlineClose,
      }}
    >
      {children}
    </IconContext.Provider>
  );
};

const useIconContext = () => useContext(IconContext);
export default useIconContext;
