import { Text } from "@chakra-ui/react";
import { func } from "prop-types";
import { STEPS } from "../../../constants";
import NextButton from "../../../Components/NextButton";

const Introduction = ({ handleNextStep }) => {
  return (
    <>
      <Text fontSize={22} textAlign={"center"}>
        Missing your
      </Text>
      <Text fontSize={56} fontWeight={"extrabold"} textAlign={"center"}>
        Bondhu
      </Text>
      <Text fontSize={22} textAlign={"center"}>
        Lets fix that, in 2 easy steps
      </Text>

      <NextButton
        handleNextStep={() => handleNextStep({ step: STEPS.REGISTRATION })}
      />
    </>
  );
};

Introduction.propTypes = {
  handleNextStep: func.isRequired,
};

export default Introduction;
