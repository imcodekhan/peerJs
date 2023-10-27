import { ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Center, Input, Text } from "@chakra-ui/react";
import { STEPS } from "../../constants";
import { func, string } from "prop-types";
import { useState } from "react";
import { updatedUser } from "../../Services/crud";

const About = ({ name, setName, handleNextStep }) => {
  const [error, setError] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.length) {
      setError("please tell us what should we call you?");
      return;
    }
    setError("");
    const localPhoneNumber = localStorage.getItem("phoneNumber");
    updatedUser(localPhoneNumber, { name });
    handleNextStep({ step: STEPS.ADD_FIRST_CONTACT });
  }
  return (
    <>
      <Text>
        since we are meeting for the first time, please tell us your Name
      </Text>
      <Input
        type="text"
        placeholder="i.e. Django"
        background={"white"}
        value={name}
        textColor={"blue.500"}
        _placeholder={{ textColor: "blue.300" }}
        onChange={(e) => setName(e.target.value)}
      />
      {error && <Text>{error}</Text>}
      <Center>
        <Button
          variant={"solid"}
          borderRadius={"full"}
          height={90}
          width={90}
          onClick={handleSubmit}
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
