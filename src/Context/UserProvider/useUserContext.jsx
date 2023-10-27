import { useContext } from "react";
import { UserContext } from "./userProvider";

const useUserContenxt = () => {
  const { state, dispatch } = useContext(UserContext);
  return { state, dispatch };
};

export default useUserContenxt;
