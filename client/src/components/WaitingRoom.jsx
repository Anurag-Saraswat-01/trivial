import { useContext } from "react";
import PropTypes from "prop-types";
import SocketContext from "../contexts/SocketContext";

const WaitingRoom = ({ setWaiting }) => {
  const { isLeader } = useContext(SocketContext);

  return (
    <div>
      {isLeader ? (
        <div>
          <h2>Start the quiz?</h2>
          <button onClick={() => setWaiting(false)}>Start</button>
        </div>
      ) : (
        <div>Waiting for creator to start</div>
      )}
    </div>
  );
};

WaitingRoom.propTypes = {
  setWaiting: PropTypes.func,
};

export default WaitingRoom;
