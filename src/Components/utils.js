export const checkIsUserLoggedIn = (navigate, detailsOfProduct, action) => {
  if (localStorage.getItem("token")) {
    action(detailsOfProduct);
  } else {
    navigate("/login");
  }
};
