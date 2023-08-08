import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [toast, setToast] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    userDetails: {
      username: "",
      email: "",
      password: "",
      name: "",
    },
    error: "",
  });

  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: user.userDetails.email,
          password: user.userDetails.password,
          someUserAttribute1: user.userDetails.name,
        }),
      });
      if (response.status === 201) {
        const { encodedToken } = await response.json();
        localStorage.setItem("encodedToken", encodedToken);
        setUser({ ...user, isLoggedIn: true, error: "" });
        navigate("/pages/LandingPage/Landing");
      } else if (response.status === 422) {
        setUser({ ...user, error: "User Already Exists" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const signIn = async () => {
    try {
      const cred = {
        email: user.userDetails.email,
        password: user.userDetails.password,
      };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(cred),
      });
      if (response.status === 200) {
        const { encodedToken } = await response.json();
        localStorage.setItem("encodedToken", encodedToken);
        setUser({ ...user, isLoggedIn: true, error: "" });
        navigate("/pages/LandingPage/Landing");
        notificationHandler("Welcome Back");
      } else if (response.status === 404) {
        setUser({ ...user, error: "User not found" });
        notificationHandler("User not found");
      } else if (response.status === 401) {
        setUser({ ...user, error: "Invalid credentials" });
        notificationHandler("Invalid credentials");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const signOutHandler = () => {
    localStorage.removeItem("encodedToken");
    notificationHandler("Logged out");
    navigate("/");
  };

  const notificationHandler = (message) => {
    let a = document.querySelector("#notify");
    a.innerHTML = `<p>${message}</p>`;
    setToast(true);
    setTimeout(() => {
      a.innerHTML = "";
      setToast(false);
    }, 2000);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
