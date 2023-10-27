import { useContext } from "react";
import { UserContext } from ".";

const useUserContenxt = () => {
  const { state, dispatch } = useContext(UserContext);
  return { state, dispatch };
};

export default useUserContenxt;
