export default function FilterReduce(state, action) {
  switch (action.type) {
    case "PRODUCTS":
      return { ...state, arrProducts: [...action.payload] };
    case "CATEGORIES":
      return { ...state, arrCategories: [...action.payload] };
    case "HTL":
      return {
        ...state,
        selectedClearFilter: false,
        arrProducts: [...action.payload.sort((a, b) => b.price - a.price)],
      };
    case "LTH":
      return {
        ...state,
        selectedClearFilter: false,
        arrProducts: [...action.payload.sort((a, b) => a.price - b.price)],
      };
    case "1":
    case "2":
    case "3":
    case "4":
      return {
        ...state,
        selectedClearFilter: false,
        ratingSelected: action.type,
      };
    case "TOGGLE_CATEGORY":
      if (
        state.checkboxes.length >= 3 ||
        state.checkboxes.includes(action.payload)
      ) {
        return {
          ...state,
          checkboxes: state.checkboxes.filter((cat) => cat !== action.payload),
        };
      } else {
        let verifyAllCat = Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload];
        return { ...state, checkboxes: [...state.checkboxes, ...verifyAllCat] };
      }
    case "RANGE":
      return { ...state, selectedRange: action.payload };
    case "CLEAR":
      return { ...state, selectedClearFilter: action.payload };
    case "SERCH_VALUE":
      console.log(action.payload.toLowerCase().trim());
      return { ...state, searchValue: action.payload.toLowerCase().trim() };
    default:
      return state;
  }
}
