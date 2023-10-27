import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { func, string } from "prop-types";
import { useState } from "react";
import { getUserByPhoneNumber } from "../../../Services/crud";

const AddContact = ({ handleAddContact }) => {
  const [destPhoneNumber, setDestPhoneNumber] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (destPhoneNumber.length !== 10) {
        setError("Phone numbe shoud be 10 digits");
        return;
      }
      setError("");
      const contactDetails = await getUserByPhoneNumber(destPhoneNumber);
      if (!contactDetails) {
        setError("Check the number again; no contact details for this.");
        return;
      }
      handleAddContact(contactDetails);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Text>We are one click just away</Text>
      <FormControl isInvalid={!error}>
        <FormLabel>Phone number</FormLabel>
        <InputGroup mt={5}>
          <InputLeftElement pointerEvents="none">
            <Text fontSize={16} textColor={"blue.300"}>
              +91
            </Text>
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="i.e. 6284922773"
            background={"white"}
            value={destPhoneNumber}
            textColor={"blue.500"}
            _placeholder={{ textColor: "blue.300" }}
            onChange={(e) => setDestPhoneNumber(e.target.value)}
          />
        </InputGroup>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
      <Center>
        <Button
          variant={"solid"}
          borderRadius={"full"}
          height={90}
          width={90}
          onClick={handleSubmit}
        >
          <PhoneIcon color={"blue.500"} height={30} width={30} />
        </Button>
      </Center>
    </>
  );
};

AddContact.propTypes = {
  destPhoneNumber: string.isRequired,
  setDestPhoneNumber: func.isRequired,
  handleAddContact: func.isRequired,
};

export default AddContact;