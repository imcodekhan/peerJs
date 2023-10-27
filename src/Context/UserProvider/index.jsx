import { createContext, useReducer } from "react";
import { node } from "prop-types";
import { reducer } from "./userReducer";

export const UserContext = createContext();

const initialState = {
  userData: null,
  name: "",
  phoneNumber: "",
  contacts: [],
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: node.isRequired,
};

export default UserProvider;
