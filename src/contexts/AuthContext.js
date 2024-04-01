import { useRef, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const AuthContext = createContext();

const reset = {
  inputs: {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
    address: "",
  },
};

export function AuthContextProvider({ children }) {
  const [toast, setToast] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    isEdited: false,
    inputs: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
      address: "",
    },
    user: {},
    loading: false,
    error: "",
  });

  const navigate = useNavigate();
  const errDivRef = useRef();

  const signUp = async () => {
    try {
      setUser({ ...user, loading: true });
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
        setUser({ ...user, loading: false, inputs: reset.inputs });
        navigate("/");
        localStorage.setItem("token", resData.data.token);
        localStorage.setItem("user", JSON.stringify(resData.data.createdUser));
      }
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const signIn = async (data) => {
    try {
      setUser({ ...user, loading: true });
      const signResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data?.email || user.inputs.email,
          password: data?.password || user.inputs.password,
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
      if (
        localStorage.getItem("path") &&
        localStorage.getItem("path") !== "/signup"
      ) {
        navigate(-1);
      } else {
        navigate("/");
      }
      setUser({ ...user, loading: false, inputs: reset.inputs });
    } catch (err) {
      console.error(err);
      notificationHandler(err.message);
    }
  };

  const updateProfile = async () => {
    try {
      setUser({ ...user, isEdited: true });
      const userId = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`${API_URL}/users/${userId._id}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ details: user.inputs }),
      });
      console.log(user.inputs);
      const resData = await response.json();
      if (!response.ok) {
        throw resData;
      } else {
        setUser({ ...user, isEdited: false });
        localStorage.setItem("user", JSON.stringify(resData.data));
        notificationHandler("Profile updated successfully");
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
    navigate("/login");
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
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
