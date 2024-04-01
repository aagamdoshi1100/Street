export const initialAddressValue = {
  inputs: {
    address: "",
    city: "",
    state: "",
    postalcode: "",
  },
  addresses: [],
  toggle: {
    isEnabled: false,
  },
  deliveryAddress: {},
};

export default function AddressManagementReducer(state, action) {
  switch (action.type) {
    case "ALL_ADDRESSES":
      return {
        ...state,
        addresses: action.payload,
      };
    case "ADD_ADDRESSES":
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    case "TOGGLE_ADDRESS_FORM":
      return {
        ...state,
        toggle: {
          ...state.toggle,
          isEnabled: !state.toggle.isEnabled,
        },
      };
    case "INPUT_HANDLER":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.key]: action.payload.value,
        },
      };
    case "SET_DELIVERY_ADD":
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    default:
      return state;
  }
}
