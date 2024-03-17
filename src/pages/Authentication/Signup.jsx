import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import styles from "./authentication.module.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";

export default function Signup() {
  const { signUp, user, setUser } = useAuthContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
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
          <button onClick={signUp}>Create new account</button>
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
