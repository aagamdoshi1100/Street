import { useEffect } from "react";
import useAuthContext from "../../contexts/AuthContext";
import Loading from "../../Components/Loading/Loading";
import styles from "./profile.module.css";
import { MdOutlineMailOutline } from "react-icons/md";
import NavBar from "../../Components/NavBarPage/NavBar";

function Profile() {
  const { user, setUser, updateProfile } = useAuthContext();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser({
      ...user,
      inputs: {
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        mobile: userData.mobile,
        address: userData.address,
      },
    });
  }, []);
  localStorage.setItem("path", window.location.pathname);
  const inputHandler = (name, value) => {
    setUser({
      ...user,
      inputs: {
        ...user.inputs,
        [name]: value,
      },
    });
  };
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.user}>
        <div className={styles.basicDetails}>
          <div className={styles.initials}>
            {user.inputs.firstname[0]?.toUpperCase()}
          </div>
          <p className={styles.fullname}>
            {user.inputs.firstname?.toUpperCase()}{" "}
            {user.inputs.lastname?.toUpperCase()}
          </p>
          <p className={styles.email}>{user.inputs.email}</p>
        </div>
        <hr />
      </div>
      <div className={styles.settingAndOrders}>
        <div className={styles.form}>
          <div className={styles.inputDesign}>
            <input
              type="text"
              value={user.inputs.firstname}
              onChange={(e) => inputHandler("firstname", e.target.value)}
            />
            <label>Firstname</label>
          </div>
          <div className={styles.inputDesign}>
            <input
              type="text"
              value={user.inputs.lastname}
              onChange={(e) => inputHandler("lastname", e.target.value)}
            />
            <label>Lastname</label>
          </div>
          <div className={styles.inputDesign}>
            <input
              type="text"
              value={user.inputs.email}
              onChange={(e) => inputHandler("email", e.target.value)}
            />
            <label>Email Address</label>
            <MdOutlineMailOutline size="1.7em" className={styles.icon} />
          </div>
          <div className={styles.inputDesign}>
            <input
              type="number"
              value={user.inputs.mobile}
              onChange={(e) => inputHandler("mobile", e.target.value)}
            />
            <label>Mobile Number</label>
          </div>
          <div className={styles.inputDesign}>
            <input
              type="text"
              value={user.inputs.address}
              onChange={(e) => inputHandler("address", e.target.value)}
            />
            <label>Address</label>
          </div>
          {!user.isEdited ? (
            <button onClick={updateProfile}>Save</button>
          ) : (
            <button>Please wait...</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
