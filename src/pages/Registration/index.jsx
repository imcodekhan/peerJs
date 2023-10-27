import { ArrowRightIcon } from "@chakra-ui/icons";
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
import { func, string } from "prop-types";
import { useState } from "react";
import { STEPS } from "../../constants";

const Registration = ({ phoneNumber, setPhoneNumber, handleNextStep }) => {
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

    localStorage.setItem("phoneNumber", phoneNumber);
    handleNextStep({ step: STEPS.ABOUT });
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
  phoneNumber: string.isRequired,
  setPhoneNumber: func.isRequired,
  handleNextStep: func.isRequired,
};

export default Registration;
