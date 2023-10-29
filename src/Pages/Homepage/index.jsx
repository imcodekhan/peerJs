import { ROUTES, SCREENS } from "../../constants";
import { useEffect, useRef, useState } from "react";
import CallOutgoing from "./CallOutgoing";
import CallIncoming from "./CallInprogress/CallIcoming";
import Peer from "peerjs";
import CallInprogress from "./CallInprogress";
import { getUserDetails, updateUserDetails } from "../../Services/crud";
import Layout from "../../Components/Layout";
import AddContact from "./AddContact";
import useUserContenxt from "../../Context/UserProvider/useUserContext";
import {
  addContact,
  initializeUser,
} from "../../Context/UserProvider/userActions";
import Dashboard from "./Dashboard";
import { Center, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [screen, setScreen] = useState();
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const { state, dispatch } = useUserContenxt();
  const localPhoneNumber = localStorage.getItem("phoneNumber");
  const [remoteContactDetails, setRemoteContactDetails] = useState();
  const peerInstanceRef = useRef(null);
  const localCallRef = useRef(null);
  const remoteCallRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const localPhoneNumber = localStorage.getItem("phoneNumber");
    if (!localPhoneNumber) {
      navigate(ROUTES.ONBOARDING);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    setIsLoading(true);
    async function init() {
      const user = await getUserDetails(localPhoneNumber);
      const allContactDetailsQueries = [];
      if (user?.contacts?.length) {
        user.contacts.forEach((contact) => {
          allContactDetailsQueries.push(getUserDetails(contact));
        });
        user.contacts = await Promise.all(allContactDetailsQueries);
        setScreen(SCREENS.DASHBOARD);
      } else {
        setScreen(SCREENS.ADD_CONTACT);
      }
      dispatch(initializeUser(user));
      setIsLoading(false);
    }

    init();
  }, [dispatch, localPhoneNumber]);

  useEffect(() => {
    const peer = new Peer(localPhoneNumber);
    peerInstanceRef.current = peer;

    peer.on("open", (peerId) => {
      console.log("you are connected to the server with peerId :", peerId);
    });

    peer.on("connection", (peerId) => {
      console.log("another user connected to server:", peerId);
    });

    peer.on("call", async (call) => {
      remoteCallRef.current = call;
      const user = await getUserDetails(call.peer);

      call.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
      });

      call.on("close", () => {
        handleDisconnectCall();
      });

      setRemoteContactDetails(user);
      setScreen(SCREENS.CALL_INCOMING);
    });
  }, []);

  async function makeCall(contact) {
    try {
      setRemoteContactDetails(contact);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const call = peerInstanceRef.current.call(
        contact.phoneNumber,
        mediaStream
      );

      localCallRef.current = call;
      setScreen(SCREENS.CALL_OUTGOING);
      setLocalStream(mediaStream);

      call.on("stream", (remoteStream) => {
        setScreen(SCREENS.CALL_INPROGRESS);
        setRemoteStream(remoteStream);
      });

      call.on("close", () => {
        handleDisconnectCall();
      });
    } catch (e) {
      console.log("calling failed", e);
    }
  }

  async function handleAddContact(contactDetails, autoCall = true) {
    const userDetails = await getUserDetails(state.phoneNumber);
    const updatedDetails = {
      ...userDetails,
      contacts: [...(userDetails?.contacts || []), contactDetails.phoneNumber],
    };
    const { success } = updateUserDetails(state.phoneNumber, updatedDetails);
    if (success) {
      const localUpdate = { ...userDetails };
      localUpdate.contacts.push(contactDetails);
      dispatch(addContact(state.phoneNumber, localUpdate));
      autoCall && makeCall(contactDetails.phoneNumber);
    }
  }

  async function handleCallRecieve() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      remoteCallRef.current.answer(mediaStream);
      setScreen(SCREENS.CALL_INPROGRESS);
      setLocalStream(mediaStream);
    } catch (e) {
      console.log("calling failed", e);
    }
  }

  function handleDisconnectCall() {
    localStream?.getTracks().forEach((track) => {
      track.stop();
    });
    localCallRef.current?.close();
    localCallRef.current = null;
    setLocalStream(null);

    remoteCallRef.current?.close();
    remoteCallRef.current = null;
    setRemoteStream(null);
    setRemoteContactDetails(null);

    setScreen(SCREENS.DASHBOARD);
  }

  const renderScreen = {
    [SCREENS.DASHBOARD]: (
      <Dashboard
        handleCall={makeCall}
        handleAddContact={() => setScreen(SCREENS.ADD_CONTACT)}
      />
    ),
    [SCREENS.ADD_CONTACT]: (
      <AddContact
        handleAddContact={handleAddContact}
        handleBack={() => setScreen(SCREENS.DASHBOARD)}
      />
    ),
    [SCREENS.CALL_OUTGOING]: (
      <CallOutgoing
        contact={remoteContactDetails}
        handleCallDisconnect={handleDisconnectCall}
      />
    ),
    [SCREENS.CALL_INCOMING]: (
      <CallIncoming
        caller={remoteContactDetails}
        handleCallRecieve={handleCallRecieve}
        handleCallDisconnect={handleDisconnectCall}
      />
    ),
    [SCREENS.CALL_INPROGRESS]: (
      <CallInprogress
        localStream={localStream}
        remoteStream={remoteStream}
        handleDisconnect={handleDisconnectCall}
      />
    ),
  };

  console.log({ remoteContactDetails });

  return (
    <Layout showHeader={screen === SCREENS.DASHBOARD}>
      {isLoading && (
        <Center height={"100%"} width={"100%"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="yellow.200"
            color="yellow.500"
            size="xl"
          />
        </Center>
      )}
      {renderScreen[screen]}
    </Layout>
  );
};

export default Homepage;
