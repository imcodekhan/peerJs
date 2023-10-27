import { useState } from "react";
import { func } from "prop-types";
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

const Registration = ({ handleRegistration }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  function handlesubmit(e) {
    e.preventDefault();
    if (phoneNumber === "") {
      setError("number is required*");
      return;
    }
    if (phoneNumber.length > 0 && phoneNumber.length < 10) {
      setError("number should be 10 digits");
      return;
    }
    setError("");
    handleRegistration(phoneNumber);
  }

  return (
    <>
      <Text>Tell us your</Text>
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
            value={phoneNumber}
            textColor={"blue.500"}
            _placeholder={{ textColor: "blue.300" }}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </InputGroup>
        <FormErrorMessage textColor={"white"}>{error}</FormErrorMessage>
        <FormHelperText>your phone number is secure with us*</FormHelperText>
      </FormControl>

      <Center mt={error ? 17 : 10}>
        <Button
          variant={"solid"}
          borderRadius={"full"}
          height={90}
          width={90}
          onClick={handlesubmit}
        >
          <ArrowRightIcon color={"blue.500"} height={30} width={30} />
        </Button>
      </Center>
    </>
  );
};

Registration.propTypes = {
  handleRegistration: func.isRequired,
};

export default Registration;
