import { ActionTypes } from "./userActions";

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.INITIALIZE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.UPDATE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case ActionTypes.UPDATE_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case ActionTypes.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case ActionTypes.REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (phoneNumber) => phoneNumber !== action.payload
        ),
      };
    default:
      return state;
  }
};
