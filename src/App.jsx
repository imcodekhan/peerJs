import { Card, CardBody, Center } from "@chakra-ui/react";
// import Peer from "peerjs";
import { useEffect, useState } from "react";
import Registration from "./Pages/Registration";
import { STEPS } from "./constants";
import About from "./Pages/About";
import Homepage from "./Pages/Homepage";
import Introduction from "./Pages/Introduction";

const App = () => {
  const [step, setstep] = useState();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // const [peer, setPeer] = useState();

  useEffect(() => {
    console.log("mounted", step);
    const localPhoneNumber = localStorage.getItem("phoneNumber");
    if (localPhoneNumber) {
      setstep(STEPS.HOMEPAGE);
    } else {
      setstep(STEPS.INTRODUCTION);
    }
  }, []);

  // useEffect(() => {
  //   const peer = new Peer();

  //   peer.on("open", (peerId) => {
  //     console.log("connected", peerId);
  //   });

  //   peer.on("call", async (call) => {
  //     console.log("icoming call");
  //     const mediaStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: true,
  //     });
  //     localStreamRef.current.srcObject = mediaStream;
  //     call.answer(mediaStream);
  //     call.on("stream", (remoteStream) => {
  //       remoteStreamRef.current.srcObject = remoteStream;
  //     });
  //   });

  //   setPeer(peer);
  // }, []);

  // async function handleCall() {
  //   const mediaStream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: true,
  //   });
  //   localStreamRef.current.srcObject = mediaStream;
  //   const call = peer.call(phoneNumber, mediaStream);
  //   call.on("stream", (remoteStream) => {
  //     remoteStreamRef.current.srcObject = remoteStream;
  //   });
  // }

  const renderStep = {
    [STEPS.INTRODUCTION]: (
      <Introduction handleNextStep={({ step }) => setstep(step)} />
    ),
    [STEPS.REGISTRATION]: (
      <Registration
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleNextStep={({ step }) => setstep(step)}
      />
    ),
    [STEPS.ABOUT]: (
      <About
        name={name}
        setName={setName}
        handleNextStep={({ step }) => setstep(step)}
      />
    ),
    [STEPS.HOMEPAGE]: <Homepage handleNextStep={({ step }) => setstep(step)} />,
  };

  return (
    <Center height={"100vh"} backgroundColor={"blue.100"}>
      <Card height={400} backgroundColor={"blue.500"} width={300}>
        <CardBody>{renderStep[step]}</CardBody>
      </Card>
    </Center>
  );

  // return (
  //   <div>
  //     Bondhu
  //     <div>
  //       <label htmlFor="phoneNumber">Phone Number</label>
  //       <input
  //         value={phoneNumber}
  //         onChange={(e) => setPhoneNumber(e.target.value)}
  //       />
  //       <button onClick={call}>call</button>
  //     </div>
  //     <div>
  //       <video ref={localStreamRef} autoPlay muted />
  //       <video ref={remoteStreamRef} autoPlay muted />
  //     </div>
  //   </div>
  // );
};

export default App;
