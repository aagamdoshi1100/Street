export const initialAddressValue = {
  initialAddress: [
    {
      flatNo: "002",
      BuildingName: "ShankheshwarNagar",
      Road: "Desle",
      City: "Dadar",
      State: "Maharashtra",
    },
  ],
  fields: {
    flatNo: "",
    BuildingName: "",
    Road: "",
    City: "",
    State: "",
  },
  updateAddress: false,
  selectToUpdate: null,
  addAddress: false,
  checkout: false,
};

export default function AddressManagementReducer(state, action) {
  switch (action.type) {
    case "NEW_ADD":
      return { ...state, addAddress: !action.payload };
    case "ADD":
      return {
        ...state,
        fields: {
          flatNo:
            action.payload.act === "flatNo"
              ? action.payload.data
              : state.fields.flatNo,
          BuildingName:
            action.payload.act === "BuildingName"
              ? action.payload.data
              : state.fields.BuildingName,
          Road:
            action.payload.act === "Road"
              ? action.payload.data
              : state.fields.Road,
          City:
            action.payload.act === "City"
              ? action.payload.data
              : state.fields.City,
          State:
            action.payload.act === "State"
              ? action.payload.data
              : state.fields.State,
        },
      };
    case "NEW_ADDRESS_ADD":
      return {
        ...state,
        initialAddress: [...state.initialAddress, action.payload],
        addAddress: false,
        fields: {
          flatNo: "",
          BuildingName: "",
          Road: "",
          City: "",
          State: "",
        },
      };
    case "SELECTED_ADD":
      return { ...state, selectToUpdate: action.payload, updateAddress: true };
    case "UPDATE":
      let alteredValue = state.initialAddress.map((item, index) => {
        if (index === state.selectToUpdate) {
          return {
            ...item,
            flatNo:
              action.payload.act === "flatNo"
                ? action.payload.data
                : state.initialAddress[state.selectToUpdate].flatNo,
            BuildingName:
              action.payload.act === "BuildingName"
                ? action.payload.data
                : state.initialAddress[state.selectToUpdate].BuildingName,
            Road:
              action.payload.act === "Road"
                ? action.payload.data
                : state.initialAddress[state.selectToUpdate].Road,
            City:
              action.payload.act === "City"
                ? action.payload.data
                : state.initialAddress[state.selectToUpdate].City,
            State:
              action.payload.act === "State"
                ? action.payload.data
                : state.initialAddress[state.selectToUpdate].State,
          };
        } else {
          return item;
        }
      });
      console.log(action.payload, alteredValue);
      return {
        ...state,
        initialAddress: alteredValue,
      };
    case "UPDATE_SUBMIT":
      return { ...state, updateAddress: false };
    case "CHECKOUT":
      return { ...state, checkout: !action.payload };
    default:
      return state;
  }
}
