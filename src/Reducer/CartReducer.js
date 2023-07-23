export const initialCartStatus = {
  cartArray: [],
};

export default function CartReducer(state, action) {
  switch (action.type) {
    case "AADTOCART":
    case "REMOVEFROMCART":
    case "QTYCONTROL":
      return { ...state, cartArray: action.payload };
    default:
      return state;
  }
}
