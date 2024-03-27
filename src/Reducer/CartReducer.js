export const initialCartStatus = {
  cartArray: [],
  loading: false,
};

export default function CartReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    case "ADD_TO_CART":
      return { ...state, cartArray: action.payload };
    case "INCREMENT":
    case "DECREMENT":
      return {
        ...state,
        cartArray: state.cartArray.map((product) => {
          if (product._id === action.payload._id) {
            if (action.payload.action === "INCREMENT") {
              return {
                ...product,
                qtyOfsameProductInCart: product.qtyOfsameProductInCart + 1,
              };
            } else {
              return {
                ...product,
                qtyOfsameProductInCart: product.qtyOfsameProductInCart - 1,
              };
            }
          }
          return product;
        }),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartArray: state.cartArray.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    case "MOVEFROMWISHLIST":
      return { ...state, cartArray: action.payload };
    default:
      return state;
  }
}
