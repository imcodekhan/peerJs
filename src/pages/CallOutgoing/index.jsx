import { Text } from "@chakra-ui/react";
import { STEPS } from "../../constants";
import { func } from "prop-types";
import { useEffect } from "react";

const CallOutgoing = ({ handleNextStep }) => {
  const destName = "pathak";

  useEffect(() => {
    const isCallConnected = false;
    if (isCallConnected) {
      handleNextStep({ step: STEPS.CALL_INPROGRESS });
    }
  }, []);

  return (
    <>
      <Text>We are calling {destName}</Text>
      <Text>please hold your horse..</Text>
      <Text>Calling....</Text>
    </>
  );
};

CallOutgoing.propTypes = {
  handleNextStep: func.isRequired,
};

export default CallOutgoing;
