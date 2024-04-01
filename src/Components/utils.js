export const checkIsUserLoggedIn = (navigate, detailsOfProduct, action) => {
  if (localStorage.getItem("token")) {
    action(detailsOfProduct);
  } else {
    navigate("/login");
  }
};

export const validateSignupInputs = (user, setErrors) => {
  const errors = {};

  if (user.inputs.firstname === "") {
    errors.firstname = "Firstname is required";
  }

  if (user.inputs.lastname === "") {
    errors.lastname = "Lastname is required";
  }

  if (user.inputs.email === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.inputs.email)) {
    errors.email = "Invalid email address";
  }

  if (user.inputs.password === "") {
    errors.password = "Password is required";
  } else if (user.inputs.password.length < 8) {
    errors.password = "Require 8 character long password";
  }

  setErrors(errors);

  return Object.keys(errors).length === 0;
};

export const validateLoginInputs = (user, setErrors) => {
  const errors = {};

  if (user.inputs.email === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.inputs.email)) {
    errors.email = "Invalid email address";
  }

  if (user.inputs.password === "") {
    errors.password = "Password is required";
  } else if (user.inputs.password.length < 8) {
    errors.password = "Require 8 character long password";
  }

  setErrors(errors);

  return Object.keys(errors).length === 0;
};
