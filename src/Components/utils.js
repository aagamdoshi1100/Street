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

export const validateProfileInputs = (user, setErrors) => {
  const errors = {};

  if (user.inputs.firstname === "") {
    errors.firstname = "Firstname is required";
  }

  if (user.inputs.lastname === "") {
    errors.lastname = "Lastname is required";
  }

  if (user.inputs.address === "") {
    errors.address = "Address is required";
  }

  if (user.inputs.email === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.inputs.email)) {
    errors.email = "Invalid email address";
  }

  if (user.inputs.mobile === "") {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(user.inputs.mobile)) {
    errors.mobile = "Please enter a 10-digit number.";
  }

  setErrors(errors);

  return Object.keys(errors).length === 0;
};

export const validateAddressInputs = (add, setErrors) => {
  const errors = {};

  if (add.inputs.address === "") {
    errors.address = "Address is required";
  }

  if (add.inputs.state === "") {
    errors.state = "State is required";
  }

  if (add.inputs.city === "") {
    errors.city = "City is required";
  }

  if (add.inputs.postalcode === "") {
    errors.postalcode = "Postal code is required";
  } else if (add.inputs.postalcode.length !== 6) {
    errors.postalcode = "Invalid pincode. 6 digit required";
  }
  setErrors(errors);

  return Object.keys(errors).length === 0;
};
