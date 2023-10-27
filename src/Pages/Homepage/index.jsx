import { PhoneIcon } from "@chakra-ui/icons";
import { SCREENS } from "../../constants";
import { useEffect, useRef, useState } from "react";
import { List, ListItem, Modal, Text } from "@chakra-ui/react";
import CallOutgoing from "./CallOutgoing";
import CallIncoming from "./CallInprogress/CallIcoming";
import Peer from "peerjs";
import CallInprogress from "./CallInprogress";
import { getUserByPhoneNumber, updatedUser } from "../../Services/crud";
import Layout from "../../Components/Layout";
import AddContact from "./AddContact";

const Homepage = () => {
  const [screen, setScreen] = useState();
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerInstanceRef = useRef(null);

  useEffect(() => {
    const localPhoneNumber = localStorage.getItem("phoneNumber");
    const peer = new Peer(localPhoneNumber);
    peerInstanceRef.current = peer;

    peer.on("open", (peerId) => {
      console.log("you are connected to the server with peerId :", peerId);
    });

    peer.on("call", (call) => {
      console.log(call);
      setScreen(SCREENS.CALL_INCOMING);
    });
  }, []);

  async function makeCall(contact) {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const call = peerInstanceRef.current.call(
        contact.phoneNumber,
        mediaStream
      );
      setScreen(SCREENS.CALL_OUTGOING);
      call.on("stream", (remoteStream) => {
        setScreen(SCREENS.CALL_INPROGRESS);
        remoteStreamRef.current.srcObject = remoteStream;
      });
    } catch (e) {
      console.log("calling failed", e);
    }
  }

  async function handleAddContact(contactDetails, autoCall = false) {
    autoCall && makeCall(contactDetails.phoneNumber);
    const localPhoneNumber = localStorage.getItem("phoneNumber");
    const userDetails = await getUserByPhoneNumber(localPhoneNumber);
    const updatedDetails = {
      ...userDetails,
      contacts: [...userDetails.contacts, contactDetails.phoneNumber],
    };
    updatedUser(localPhoneNumber, updatedDetails);
  }

  const renderScreen = {
    [SCREENS.ADD_FIRST_CONTACT]: (
      <AddContact handleAddContact={handleAddContact} />
    ),
    [SCREENS.CALL_OUTGOING]: (
      <CallOutgoing handleScreenChange={({ screen }) => setScreen(screen)} />
    ),
    [SCREENS.CALL_INCOMING]: (
      <CallIncoming handleScreenChange={({ screen }) => setScreen(screen)} />
    ),
    [SCREENS.CALL_INPROGRESS]: (
      <CallInprogress
        localStreamRef={localStreamRef}
        remoteStreamRef={remoteStreamRef}
        handleScreenChange={({ screen }) => setScreen(screen)}
      />
    ),
  };
  const user = {
    name: "John",
    contacts: [
      {
        name: "amir",
        phoneNumber: "123123",
      },
    ],
  };

  function handleCall(contact) {
    console.log("Calling", contact.name);
  }

  return (
    <Layout>
      {screen && (
        <Modal isOpen={true} size={"full"}>
          {renderScreen[screen]}
        </Modal>
      )}
      <Text>Hello {user.name}</Text>
      <List>
        {user.contacts.map((contact) => {
          return (
            <ListItem
              key={contact.phoneNumber}
              onClick={() => handleCall(contact)}
            >
              {user.name} <PhoneIcon />
            </ListItem>
          );
        })}
      </List>
    </Layout>
  );
};

export default Homepage;
