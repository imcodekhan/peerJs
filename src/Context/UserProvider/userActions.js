export const ActionTypes = {
  INITIALIZE: "initialize",
  UPDATE_NAME: "update_name",
  UPDATE_PHONE_NUMBER: "update_phone_number",
  ADD_CONTACT: "add_contact",
  REMOVE_CONTACT: "remove_contact",
};

export function createAction(type, payload) {
  return { type, payload };
}

export const initializeUser = (userData) =>
  createAction(ActionTypes.INITIALIZE, userData);

export const updatePhoneNumber = (phoneNumber) =>
  createAction(ActionTypes.UPDATE_PHONE_NUMBER, phoneNumber);

export const updateName = (name) => createAction(ActionTypes.UPDATE_NAME, name);

export const addContact = (contactDetails) =>
  createAction(ActionTypes.ADD_CONTACT, contactDetails);

export const removeContact = (phoneNumber) =>
  createAction(ActionTypes.REMOVE_CONTACT, phoneNumber);
