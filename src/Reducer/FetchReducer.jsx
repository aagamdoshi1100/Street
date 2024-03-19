export default function FetchReducer(state, action) {
  switch (action.type) {
    case "PRODUCTS":
      return { ...state, arrProducts: action.payload };
    case "SINGLE_PRODUCTS":
      return { ...state, selectedProduct: action.payload };
    case "FILTER_TOGGLER":
      return {
        ...state,
        filter: {
          ...state.filter,
          isEnabled: !state.filter.isEnabled,
        },
      };

    default:
      return state;
  }
}
