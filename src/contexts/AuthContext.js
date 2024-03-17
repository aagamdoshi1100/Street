import { useRef, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [toast, setToast] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    inputs: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    user: {},
    error: "",
  });

  const navigate = useNavigate();
  const errDivRef = useRef();

  const signUp = async () => {
    try {
      const signupResponse = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.inputs.email,
          password: user.inputs.password,
          firstname: user.inputs.firstname,
          lastname: user.inputs.lastname,
        }),
      });
      const resData = await signupResponse.json();
      console.log(signupResponse, resData);
      if (!signupResponse.ok) {
        throw resData;
      } else {
        localStorage.setItem("token", resData.data.token);
        localStorage.setItem("user", JSON.stringify(resData.data.createdUser));
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const signIn = async () => {
    try {
      const signResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.inputs.email,
          password: user.inputs.password,
        }),
      });
      const resData = await signResponse.json();
      if (!signResponse.ok) {
        throw resData;
      } else {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("user", JSON.stringify(resData.loggedInUser));
        setUser((prevState) => {
          return {
            ...prevState,
            user: resData.loggedInUser,
          };
        });
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };
  const signOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    notificationHandler("Logged out");
    navigate("/");
  };

  const notificationHandler = (message) => {
    errDivRef.current.innerText = message;
    setToast(true);
    setTimeout(() => {
      errDivRef.current.innerText = "";
      setToast(false);
    }, 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signUp,
        navigate,
        signOutHandler,
        toast,
        setToast,
        notificationHandler,
        errDivRef,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
