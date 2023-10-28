import { Button, List, ListItem, Text } from "@chakra-ui/react";
import useUserContenxt from "../../../Context/UserProvider/useUserContext";
import { AddIcon, PhoneIcon } from "@chakra-ui/icons";
import { func } from "prop-types";

const Dashboard = ({ handleCall }) => {
  const { state } = useUserContenxt();
  return (
    <>
      <Text>Hello {state.name}</Text>
      <List>
        {state.contacts.map((contact) => {
          return (
            <ListItem
              key={contact.phoneNumber}
              onClick={() => handleCall(contact)}
            >
              {contact.name} <PhoneIcon />
            </ListItem>
          );
        })}
      </List>
      <Button borderRadius={"full"}>
        <AddIcon />
      </Button>
    </>
  );
};

Dashboard.propTypes = {
  handleCall: func.isRequired,
};

export default Dashboard;
