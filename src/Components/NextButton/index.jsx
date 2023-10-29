import { ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Center } from "@chakra-ui/react";
import { func } from "prop-types";

const NextButton = ({ handleNextStep }) => {
  return (
    <Center>
      <Button
        variant={"solid"}
        borderRadius={"full"}
        height={"80px"}
        width={"80px"}
        mt={"20px"}
        backgroundColor={"black"}
        onClick={handleNextStep}
        _hover={{
          backgroundColor: "white",
        }}
      >
        <ArrowRightIcon
          color={"yellow"}
          height={"30px"}
          width={"30px"}
          _hover={{ color: "black" }}
        />
      </Button>
    </Center>
  );
};

NextButton.propTypes = {
  handleNextStep: func.isRequired,
};

export default NextButton;
