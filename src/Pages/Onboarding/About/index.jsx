import { useState } from "react";
import { func } from "prop-types";
import { Button, Center, Input, Text } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

const About = ({ handleAboutUpdate }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!name.length) {
        setError("please tell us what should we call you?");
        return;
      }
      setError("");
      handleAboutUpdate({ name });
    } catch (error) {
      console.error(error);
    }
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
  handleAboutUpdate: func.isRequired,
};

export default About;
