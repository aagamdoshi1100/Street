export const initialCartStatus = {
  cartArray: [],
  loading: false,
  addToCartLoading: {
    isEnabled: false,
    productId: "",
  },
  moveToWishListLoading: {
    isEnabled: false,
    productId: "",
  },
  orderDetails: {
    orders: [],
  },
};

export default function CartReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    case "LOADING_ADD_TO_CART":
      return {
        ...state,
        addToCartLoading: {
          ...state.addToCartLoading,
          isEnabled: !state.addToCartLoading.isEnabled,
          productId: action.payload,
        },
      };
    case "LOADING_MOVE_TO_WISHLIST":
      return {
        ...state,
        moveToWishListLoading: {
          ...state.moveToWishListLoading,
          isEnabled: !state.moveToWishListLoading.isEnabled,
          productId: action.payload,
        },
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
    case "MOVE_TO_WISHLIST":
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartArray: state.cartArray.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    case "MOVEFROMWISHLIST":
      return { ...state, cartArray: action.payload };
    case "FETCH_ORDERS":
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          orders: action.payload,
        },
      };
    default:
      return state;
  }
}
