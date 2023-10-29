import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout";
import Introduction from "./Introduction";
import Registration from "./Registration";
import { ROUTES, STEPS } from "../../constants";
import { registerUser, updateUserDetails } from "../../Services/crud";
import useUserContext from "../../Context/UserProvider/useUserContext";
import {
  updateName,
  updatePhoneNumber,
} from "../../Context/UserProvider/userActions";
import About from "./About";

const Onboarding = () => {
  const [step, setStep] = useState(STEPS.INTRODUCTION);
  const { state, dispatch } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const localPhoneNumber = localStorage.getItem("phoneNumber");
    if (localPhoneNumber) {
      navigate(ROUTES.HOMEPAGE);
    }
  }, [dispatch, navigate]);

  async function handleRegistration(phoneNumber) {
    const { success } = await registerUser(phoneNumber);
    if (success) {
      localStorage.setItem("phoneNumber", phoneNumber);
      dispatch(updatePhoneNumber(phoneNumber));
      setStep(STEPS.ABOUT);
    }
  }

  async function handleAboutUpdate(updatedUser) {
    const { success } = await updateUserDetails(state.phoneNumber, {
      ...state,
      ...updatedUser,
    });
    if (success) {
      dispatch(updateName(updatedUser.name));
      navigate(`${ROUTES.HOMEPAGE}?isFirstContact=true`);
    }
  }

  const renderStep = {
    [STEPS.INTRODUCTION]: (
      <Introduction handleNextStep={({ step }) => setStep(step)} />
    ),
    [STEPS.REGISTRATION]: (
      <Registration handleRegistration={handleRegistration} />
    ),
    [STEPS.ABOUT]: <About handleAboutUpdate={handleAboutUpdate} />,
  };

  return <Layout>{renderStep[step]}</Layout>;
};

export default Onboarding;
