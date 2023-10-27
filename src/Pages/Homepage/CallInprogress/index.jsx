import { object } from "prop-types";

const CallInprogress = (localStreamRef, remoteStreamRef) => {
  return (
    <>
      <video ref={localStreamRef} autoPlay muted />
      <video ref={remoteStreamRef} autoPlay muted />
    </>
  );
};

CallInprogress.propTypes = {
  localStreamRef: object.isRequired,
  remoteStreamRef: object.isRequired,
};

export default CallInprogress;
