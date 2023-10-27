import { ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Center, Input, Text } from "@chakra-ui/react";
import { STEPS } from "../../constants";
import { func, string } from "prop-types";

const About = ({ name, setName, handleNextStep }) => {
  return (
    <>
      <Text>since we are meeting for the first time, please tell us your</Text>
      <Input
        type="text"
        placeholder="i.e. 6284922773"
        background={"white"}
        value={name}
        textColor={"blue.500"}
        _placeholder={{ textColor: "blue.300" }}
        onChange={(e) => setName(e.target.value)}
      />
      <Center>
        <Button
          variant={"solid"}
          borderRadius={"full"}
          height={90}
          width={90}
          onClick={handleNextStep({ step: STEPS.ADD_FIRST_CONTACT })}
        >
          <ArrowRightIcon color={"blue.500"} height={30} width={30} />
        </Button>
      </Center>
    </>
  );
};

About.propTypes = {
  name: string.isRequired,
  setName: func.isRequired,
  handleNextStep: func.isRequired,
};

export default About;
