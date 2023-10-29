import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { func, shape, string } from "prop-types";

const CallOutgoing = ({ contact, handleCallDisconnect }) => {
  return (
    <Flex
      direction={"column"}
      justify={"start"}
      alignItems={"center"}
      height={"100%"}
    >
      <Avatar size={"xl"} src={contact.avatar} mt={"50px"} />
      <Text fontSize={12} fontWeight={"extrabold"} mt={"3px"}>
        calling via pager
      </Text>
      <Text
        fontSize={48}
        textTransform={"capitalize"}
        fontWeight={"extrabold"}
        mt={"10px"}
      >
        {contact.name}
      </Text>
      <Button onClick={handleCallDisconnect}>Cancel Call</Button>
    </Flex>
  );
};

CallOutgoing.defaultProps = {
  contact: {
    name: "Bondhu",
    avatar: "B",
  },
};

CallOutgoing.propTypes = {
  contact: shape({
    name: string,
    avatar: string,
  }),
  handleCallDisconnect: func.isRequired,
};

export default CallOutgoing;
