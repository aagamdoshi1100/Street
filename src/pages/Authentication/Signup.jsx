import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import styles from "./authentication.module.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";
import { validateSignupInputs } from "../../Components/utils";

export default function Signup() {
  const { signUp, user, setUser } = useAuthContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errors, setErrors] = useState({});
  localStorage.setItem("path", window.location.pathname);

  const handleSignUp = () => {
    const isValid = validateSignupInputs(user, setErrors);
    if (isValid) {
      signUp();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.Brandname}>
        <h1>STREET</h1>
      </div>
      <div className={styles.box}>
        <div className={styles.form}>
          <h2>Sign up</h2>
          <div className={styles.inputDesign}>
            <input
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  inputs: { ...user.inputs, firstname: e.target.value },
                })
              }
            />
            <label>Firstname</label>
          </div>
          {errors.firstname && (
            <p className={styles.error}>{errors.firstname}</p>
          )}
          <div className={styles.inputDesign}>
            <input
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  inputs: { ...user.inputs, lastname: e.target.value },
                })
              }
            />
            <label>Lastname</label>
          </div>
          {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}
          <div className={styles.inputDesign}>
            <input
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  inputs: { ...user.inputs, email: e.target.value },
                })
              }
            />
            <label>Email Address</label>
            <MdOutlineMailOutline size="1.7em" className={styles.icon} />
          </div>
          {errors.email && <p className={styles.error}>{errors.email}</p>}
          <div className={styles.inputDesign}>
            <input
              type={passwordVisibility ? "text" : "password"}
              onChange={(e) =>
                setUser({
                  ...user,
                  inputs: { ...user.inputs, password: e.target.value },
                })
              }
            />
            <label>Password</label>
            {passwordVisibility ? (
              <FaRegEye
                size="1.7em"
                className={styles.icon}
                onClick={() => setPasswordVisibility((prevState) => !prevState)}
              />
            ) : (
              <FaEyeSlash
                size="1.7em"
                className={styles.icon}
                onClick={() => setPasswordVisibility((prevState) => !prevState)}
              />
            )}
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          {user.loading ? (
            <button>Please wait...</button>
          ) : (
            <button onClick={handleSignUp}>Create new account</button>
          )}
          <div className={styles.navlink}>
            <NavLink to="/login">Already member? Login</NavLink>
          </div>
        </div>
        <div className={styles.rightDiv}>
          <img
            src="/auth-default.png"
            width="100%"
            height="100%"
            alt="loginImg"
          />
          <div className={styles.rightDivNavlink}>
            <NavLink to="/login">Already member? Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
