import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon, PhoneIcon } from "@chakra-ui/icons";
import { func } from "prop-types";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../../Services/crud";
import { ROUTES } from "../../../constants";
import useUserContenxt from "../../../Context/UserProvider/useUserContext";

const AddContact = ({ handleAddContact, handleBack }) => {
  const { state } = useUserContenxt();
  const params = new URLSearchParams(location.search);
  const isFirstContact = params.get("isFirstContact");

  const [destPhoneNumber, setDestPhoneNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isFirstContact) {
      history.pushState(null, null, ROUTES.HOMEPAGE);
    }
  }, [isFirstContact]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (destPhoneNumber.length !== 10) {
      setError("Phone number shoud be 10 digits");
      return;
    }
    if (state?.contacts.includes(destPhoneNumber)) {
      setError("contact already exists");
      return;
    }
    const contactDetails = await getUserDetails(destPhoneNumber);
    if (!contactDetails) {
      setError("Check the number again; no contact details for this.");
      return;
    }

    setError("");
    handleAddContact(contactDetails);
  }

  return (
    <>
      {!isFirstContact && <ArrowBackIcon onClick={handleBack} />}
      <Text fontSize={"36"}>new Bondhu&apos;s</Text>
      <FormControl>
        <FormLabel>Phone number</FormLabel>
        <InputGroup mt={5}>
          <InputLeftElement pointerEvents="none">
            <Text fontSize={16} textColor={"blue.300"}>
              +91
            </Text>
          </InputLeftElement>
          <Input
            type="number"
            placeholder="i.e. 6284922773"
            background={"white"}
            value={destPhoneNumber}
            textColor={"blue.500"}
            _placeholder={{ textColor: "blue.300" }}
            onChange={(e) => setDestPhoneNumber(e.target.value)}
          />
        </InputGroup>
        <Text>{error}</Text>
      </FormControl>
      <Center mt={3}>
        {isFirstContact ? (
          <Button
            variant={"solid"}
            borderRadius={"full"}
            height={90}
            width={90}
            onClick={handleSubmit}
          >
            {<PhoneIcon color={"blue.500"} height={30} width={30} />}
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Add</Button>
        )}
      </Center>
    </>
  );
};

AddContact.propTypes = {
  handleAddContact: func.isRequired,
  handleBack: func.isRequired,
};

export default AddContact;
