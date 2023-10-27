import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout";
import Introduction from "./Introduction";
import Registration from "./Registration";
import About from "./About";
import { ROUTES, STEPS } from "../../constants";
import { registerUser, updatedUser } from "../../Services/crud";
import useUserContext from "../../Context/UserProvider/useUserContext";
import {
  updateName,
  updatePhoneNumber,
} from "../../Context/UserProvider/userActions";

const Onboarding = () => {
  const [step, setStep] = useState(STEPS.INTRODUCTION);
  const { state, dispatch } = useUserContext();
  const navigate = useNavigate();

  // Check if the phone number is already in local storage and skip onboarding if it is.
  useEffect(() => {
    const localPhoneNumber = localStorage.getItem("phoneNumber");
    if (localPhoneNumber) {
      navigate(ROUTES.HOMEPAGE);
    }
  }, [navigate]);

  const handleRegistration = async (phoneNumber) => {
    const { success } = await registerUser(phoneNumber);
    if (success) {
      updateUserDataAndNavigate(phoneNumber, STEPS.ABOUT);
    }
  };

  const handleAboutUpdate = async (name) => {
    const { success } = await updatedUser(state.phoneNumber, name);
    if (success) {
      updateUserDataAndNavigate(state.phoneNumber, ROUTES.HOMEPAGE);
    }
  };

  const updateUserDataAndNavigate = (phoneNumber, nextStep) => {
    localStorage.setItem("phoneNumber", phoneNumber);
    dispatch(updatePhoneNumber(phoneNumber));
    setStep(nextStep);
  };

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
