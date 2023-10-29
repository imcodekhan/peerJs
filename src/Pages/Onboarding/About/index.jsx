import { useState } from "react";
import { func } from "prop-types";
import NextButton from "../../../Components/NextButton";
import { Input, Text } from "@chakra-ui/react";

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

      <NextButton handleNextStep={handleSubmit} />
    </>
  );
};

About.propTypes = {
  handleAboutUpdate: func.isRequired,
};

export default About;
