import { Button, Center, Text } from "@chakra-ui/react";
import { func } from "prop-types";
import { PhoneIcon } from "@chakra-ui/icons";

const CallIncoming = ({ handleCallRecieve }) => {
  const callerName = "pathak";

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
  handleCallRecieve: func,
};

export default CallIncoming;
