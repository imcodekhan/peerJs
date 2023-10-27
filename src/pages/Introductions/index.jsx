import { ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Center, Text } from "@chakra-ui/react";
import { STEPS } from "../../App";
import { func } from "prop-types";

const Introduction = ({ handleNextStep }) => {
  return (
    <>
      <Text fontSize={22} textAlign={"center"} textColor={"white"}>
        Missing your
      </Text>
      <Text
        textColor={"white"}
        fontSize={56}
        fontWeight={"extrabold"}
        textAlign={"center"}
      >
        Bondhu
      </Text>
      <Text fontSize={22} textAlign={"center"} textColor={"white"}>
        Lets fix that, in 2 easy steps
      </Text>

      <Center>
        <Button
          variant={"solid"}
          borderRadius={"full"}
          height={90}
          width={90}
          onClick={handleNextStep({ step: STEPS.REGISTRATION })}
        >
          <ArrowRightIcon color={"blue.500"} height={30} width={30} />
        </Button>
      </Center>
    </>
  );
};

Introduction.propTypes = {
  handleNextStep: func.isRequired,
};

export default Introduction;
