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
    case "LOW_RANGE":
      return {
        ...state,
        filter: {
          ...state.filter,
          range: {
            ...state.filter.range,
            low: action.payload,
          },
        },
      };
    case "HIGH_RANGE":
      return {
        ...state,
        filter: {
          ...state.filter,
          range: {
            ...state.filter.range,
            high: action.payload,
          },
        },
      };
    case "CATEGORY":
      const categoryExists = state.filter.categoryCheckboxes.includes(
        action.payload
      );
      const updatedCheckboxes = categoryExists
        ? state.filter.categoryCheckboxes.filter(
            (val) => val !== action.payload
          )
        : [...state.filter.categoryCheckboxes, action.payload];

      return {
        ...state,
        filter: {
          ...state.filter,
          categoryCheckboxes: updatedCheckboxes,
        },
      };
    case "1":
    case "2":
    case "3":
    case "4":
    case "4.5":
      return {
        ...state,
        filter: {
          ...state.filter,
          ratingSelected: action.type,
        },
      };
    case "HTL":
    case "LTH":
      return {
        ...state,
        filter: {
          ...state.filter,
          sortBy: action.type,
        },
      };
    case "CLEAR":
      return { ...state, selectedClearFilter: action.payload };
    default:
      return state;
  }
}
