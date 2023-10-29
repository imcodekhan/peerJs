import {
  Avatar,
  Button,
  Flex,
  Input,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import useUserContenxt from "../../../Context/UserProvider/useUserContext";
import { AddIcon } from "@chakra-ui/icons";
import { func } from "prop-types";
import { useState } from "react";

const Dashboard = ({ handleCall, handleAddContact }) => {
  const { state } = useUserContenxt();
  const [search, setSearch] = useState("");

  const filteredContacts =
    state?.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const isEmptyState = !!(state?.conctacts?.length === 0);
  const isNoResultFound = !!(search.length && filteredContacts.length === 0);

  return (
    <>
      <Flex position={"relative"} bottom={38} alignItems={"center"}>
        <Input
          borderRadius={"full"}
          placeholder="search..."
          borderColor={"yellow"}
          backgroundColor={"white"}
          _placeholder={{ color: "whitesomke" }}
          _focus={{
            borderColor: "white",
            boxShadow: "none",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          borderRadius={"full"}
          height={"40px"}
          minWidth={"40px"}
          width={"40px"}
          marginLeft={10}
          backgroundColor={"white"}
          onClick={handleAddContact}
        >
          <AddIcon />
        </Button>
      </Flex>
      {isEmptyState && <div>empty state</div>}
      {isNoResultFound && <div>no result found</div>}
      {!!filteredContacts.length && (
        <List>
          {filteredContacts.map((contact) => {
            return (
              <ListItem
                key={contact.phoneNumber}
                onClick={() => handleCall(contact)}
                height={100}
                width={100}
                borderRadius={8}
                backgroundColor={"yellow"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                _hover={{
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <Avatar mt={3} />
                <Text
                  fontSize={28}
                  fontWeight={"extrabold"}
                  textTransform={"capitalize"}
                >
                  {contact.name}
                </Text>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

Dashboard.propTypes = {
  handleCall: func.isRequired,
  handleAddContact: func.isRequired,
};

export default Dashboard;
