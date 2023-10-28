import { Button, Center, Text } from "@chakra-ui/react";
import { func, string } from "prop-types";
import { PhoneIcon } from "@chakra-ui/icons";

const CallIncoming = ({ callerName, handleCallRecieve }) => {
  return (
    <>
      <Text>your bondhu {callerName} is calling you</Text>
      <Center>
        <Button
          variant={"solid"}
          borderRadius={"full"}
          height={90}
          width={90}
          onClick={handleCallRecieve}
        >
          <PhoneIcon color={"blue.500"} height={30} width={30} />
        </Button>
      </Center>
    </>
  );
};

CallIncoming.propTypes = {
  callerName: string,
  handleCallRecieve: func.isRequired,
};

export default CallIncoming;
