import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [peer, setPeer] = useState();
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (peerId) => {
      console.log("connected", peerId);
    });

    peer.on("call", async (call) => {
      console.log("icoming call");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      localStreamRef.current.srcObject = mediaStream;
      call.answer(mediaStream);
      call.on("stream", (remoteStream) => {
        remoteStreamRef.current.srcObject = remoteStream;
      });
    });

    setPeer(peer);
  }, []);

  async function call() {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    localStreamRef.current.srcObject = mediaStream;
    const call = peer.call(phoneNumber, mediaStream);
    call.on("stream", (remoteStream) => {
      remoteStreamRef.current.srcObject = remoteStream;
    });
  }

  return (
    <div>
      Bondhu
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={call}>call</button>
      </div>
      <div>
        <video ref={localStreamRef} autoPlay muted />
        <video ref={remoteStreamRef} autoPlay muted />
      </div>
    </div>
  );
};

export default App;
