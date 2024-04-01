export default function FetchReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          mainPageLoading: !state.loading.mainPageLoading,
        },
      };
    case "LOADING_SINGLE_PRODUCT":
      return {
        ...state,
        loading: {
          ...state.loading,
          selectedProduct: !state.loading.selectedProduct,
        },
      };
    case "PRODUCTS":
      return { ...state, arrProducts: action.payload };
    case "SINGLE_PRODUCTS":
      return { ...state, selectedProduct: action.payload };
    case "FETCH_TO_DISPLAY":
      return {
        ...state,
        cartAndWishlistStatus: {
          ...state.cartAndWishlistStatus,
          cartStatus: action.payload.cartIds,
          wishlistStatus: action.payload.wishlistIds,
        },
      };
    case "STATUS_CART":
      return {
        ...state,
        cartAndWishlistStatus: {
          ...state.cartAndWishlistStatus,
          cartStatus: [
            ...state.cartAndWishlistStatus.cartStatus,
            { _id: action.payload },
          ],
        },
      };
    case "STATUS_WISHLIST":
      const checkIfAlreadyWishMarked =
        state.cartAndWishlistStatus.wishlistStatus.find(
          (pro) => pro === action.payload
        );
      let updatedWishlistStatus;
      if (checkIfAlreadyWishMarked) {
        updatedWishlistStatus =
          state.cartAndWishlistStatus.wishlistStatus.filter(
            (pro) => pro !== action.payload
          );
      } else {
        updatedWishlistStatus = [
          ...state.cartAndWishlistStatus.wishlistStatus,
          action.payload,
        ];
      }
      return {
        ...state,
        cartAndWishlistStatus: {
          ...state.cartAndWishlistStatus,
          wishlistStatus: updatedWishlistStatus,
        },
      };
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
    case "CLEAR_FILTER":
      return {
        ...state,
        filter: {
          ratingSelected: null,
          sortBy: "",
          range: {
            low: "",
            high: "",
          },
          categoryCheckboxes: [],
        },
      };
    case "TOGGLE_SEARCHBAR":
    case "VIEW_SEARCHED_PRODUCT":
      return {
        ...state,
        search: {
          ...state.search,
          isEnabled: !state.search.isEnabled,
          value: "",
          results: [],
        },
      };
    case "SET_VALUE":
      return {
        ...state,
        search: {
          ...state.search,
          value: action.payload,
        },
      };
    case "SET_RESULT":
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload.data,
        },
      };
    case "CLEAR_RESULTS":
      return {
        ...state,
        search: {
          ...state.search,
          value: "",
          results: [],
        },
      };
    default:
      return state;
  }
}
