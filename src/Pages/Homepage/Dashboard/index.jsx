import { Avatar, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import useUserContenxt from "../../../Context/UserProvider/useUserContext";
import { AddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { func } from "prop-types";
import { useState } from "react";

const Dashboard = ({ handleCall, handleAddContact, handleRemoveContact }) => {
  const { state } = useUserContenxt();
  const [search, setSearch] = useState("");

  const filteredContacts =
    state?.contacts?.filter((contact) =>
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
        <Flex>
          {filteredContacts.map((contact) => {
            return (
              <Container
                key={contact.phoneNumber}
                onClick={() => handleCall(contact)}
                height={100}
                width={100}
                borderRadius={8}
                color={"white"}
                backgroundColor={"black"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                _hover={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <SmallCloseIcon
                  alignSelf={"end"}
                  mt={"5px"}
                  mr={"-10px"}
                  borderRadius={"full"}
                  _hover={{
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveContact(contact);
                  }}
                />
                <Avatar size={"md"} />
                <Text
                  fontSize={16}
                  fontWeight={"extrabold"}
                  textTransform={"capitalize"}
                >
                  {contact.name}
                </Text>
              </Container>
            );
          })}
        </Flex>
      )}
    </>
  );
};

Dashboard.propTypes = {
  handleCall: func.isRequired,
  handleAddContact: func.isRequired,
  handleRemoveContact: func.isRequired,
};

export default Dashboard;
