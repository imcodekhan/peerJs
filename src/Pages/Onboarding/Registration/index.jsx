import { useState } from "react";
import { func } from "prop-types";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import NextButton from "../../../Components/NextButton";

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

      <NextButton handleNextStep={handlesubmit} />
    </>
  );
};

Registration.propTypes = {
  handleRegistration: func.isRequired,
};

export default Registration;
