import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../Components/Layout";
import Introduction from "./Introduction";
import Registration from "./Registration";
import About from "./About";
import { STEPS } from "../../constants";
import { registerUser } from "../../Services/crud";

const Onboarding = () => {
  const [step, setstep] = useState(STEPS.INTRODUCTION);

  const navigate = useNavigate();

  useEffect(() => {
    const localPhoneNumber = localStorage.getItem("phoneNumber");
    if (localPhoneNumber) {
      navigate("/homepage");
    }
  }, []);

  function handleRegistration(phoneNumber) {
    const { success } = registerUser(phoneNumber);
    console.log({ success });
  }
  function handleAboutUpdate() {}

  const renderStep = {
    [STEPS.INTRODUCTION]: (
      <Introduction handleNextStep={({ step }) => setstep(step)} />
    ),
    [STEPS.REGISTRATION]: (
      <Registration handleRegistration={handleRegistration} />
    ),
    [STEPS.ABOUT]: <About handleAboutUpdate={handleAboutUpdate} />,
  };

  return <Layout>{renderStep[step]}</Layout>;
};

export default Onboarding;
