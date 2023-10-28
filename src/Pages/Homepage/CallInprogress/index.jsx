import { Button, Center } from "@chakra-ui/react";
import { func, object } from "prop-types";
import { useEffect, useRef } from "react";

const CallInprogress = ({ remoteStream, handleDisconnect }) => {
  const remoteStreamRef = useRef(null);

  useEffect(() => {
    remoteStreamRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  return (
    <>
      <video
        ref={remoteStreamRef}
        style={{ objectFit: "cover", height: "90%" }}
        autoPlay
        muted
      />
      <Center mt={2}>
        <Button
          backgroundColor={"blue.900"}
          color={"white"}
          _hover={{ color: "blue.900", backgroundColor: "white" }}
          onClick={handleDisconnect}
        >
          Disconnect
        </Button>
      </Center>
    </>
  );
};

CallInprogress.propTypes = {
  localStream: object,
  remoteStream: object,
  handleDisconnect: func.isRequired,
};

export default CallInprogress;
