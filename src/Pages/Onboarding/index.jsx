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

  console.log({ state });

  useEffect(() => {
    const localPhoneNumber = localStorage.getItem("phoneNumber");
    if (localPhoneNumber) {
      navigate(ROUTES.HOMEPAGE);
    }
  }, [navigate]);

  async function handleRegistration(phoneNumber) {
    const { success } = await registerUser(phoneNumber);
    if (success) {
      localStorage.setItem("phoneNumber", phoneNumber);
      dispatch(updatePhoneNumber(phoneNumber));
      setStep(STEPS.ABOUT);
    }
  }

  async function handleAboutUpdate(name) {
    const { success } = await updatedUser(state.phoneNumber, name);
    if (success) {
      dispatch(updateName(name));
      navigate(ROUTES.HOMEPAGE);
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
