import { Avatar, Button, Center, Flex, Text } from "@chakra-ui/react";
import { func, shape, string } from "prop-types";
import { PhoneIcon } from "@chakra-ui/icons";

const CallIncoming = ({ caller, handleCallRecieve, handleCallDisconnect }) => {
  return (
    <Flex
      direction={"column"}
      justify={"start"}
      alignItems={"center"}
      height={"100%"}
    >
      <Text>Incoming call from</Text>
      <Avatar size={"xl"} src={caller.avatar} mt={"50px"} />
      <Text
        fontSize={48}
        textTransform={"capitalize"}
        fontWeight={"extrabold"}
        mt={"10px"}
      >
        {caller.name}
      </Text>
      <Center gap={"40px"}>
        <Button
          variant={"solid"}
          borderRadius={"full"}
          height={"40px"}
          width={"40px"}
          onClick={handleCallRecieve}
        >
          <PhoneIcon color={"blue.500"} height={"30px"} width={"30px"} />
        </Button>
        <Button
          variant={"solid"}
          borderRadius={"full"}
          height={"40px"}
          width={"40px"}
          onClick={handleCallDisconnect}
          backgroundColor={"red"}
        >
          <PhoneIcon color={"white"} height={"30px"} width={"30px"} />
        </Button>
      </Center>
    </Flex>
  );
};

CallIncoming.defaultProps = {
  caller: {
    name: "Bondhu",
    avatar: "B",
  },
};

CallIncoming.propTypes = {
  caller: shape({
    name: string,
    avatar: string,
  }),
  handleCallDisconnect: func.isRequired,
  handleCallRecieve: func.isRequired,
};

export default CallIncoming;
