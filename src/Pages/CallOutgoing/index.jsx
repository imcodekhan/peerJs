import { Text } from "@chakra-ui/react";
import { string } from "prop-types";

const CallOutgoing = (contactName) => {
  return (
    <>
      <Text>We are calling {contactName}</Text>
      <Text>please hold your horse..</Text>
      <Text>Calling....</Text>
    </>
  );
};

CallOutgoing.propTypes = {
  contactName: string,
};

export default CallOutgoing;
