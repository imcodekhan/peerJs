import { Button, Center, Text } from "@chakra-ui/react";
import { STEPS } from "../../constants";
import { func } from "prop-types";
import { useEffect } from "react";
import { PhoneIcon } from "@chakra-ui/icons";

const CallIncoming = ({ handleNextStep }) => {
  const callerName = "pathak";

  useEffect(() => {
    const isCallConnected = false;
    if (isCallConnected) {
      handleNextStep({ step: STEPS.CALL_INPROGRESS });
    }
  }, []);

  return (
    <>
      <Text>your bondhu {callerName} is calling you</Text>
      <Center>
        <Button
          variant={"solid"}
          borderRadius={"full"}
          height={90}
          width={90}
          onClick={handleNextStep({ step: STEPS.CALL_OUTGOING })}
        >
          <PhoneIcon color={"blue.500"} height={30} width={30} />
        </Button>
      </Center>
    </>
  );
};

CallIncoming.propTypes = {
  handleNextStep: func.isRequired,
};

export default CallIncoming;
