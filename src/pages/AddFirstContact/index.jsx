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
import { STEPS } from "../../constants";
import { PhoneIcon } from "@chakra-ui/icons";

const AddFirstContact = ({
  destPhoneNumber,
  setDestPhoneNumber,
  handleNextStep,
}) => {
  <>
    <Text>We are one click just away</Text>
    <FormControl>
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
    </FormControl>
    <Center>
      <Button
        variant={"solid"}
        borderRadius={"full"}
        height={90}
        width={90}
        onClick={handleNextStep({ step: STEPS.CALL_OUTGOING })}
      >
        <PhoneIcon color={"blue.500"} height={30} width={30} />
      </Button>
    </Center>
  </>;
};

export default AddFirstContact;
