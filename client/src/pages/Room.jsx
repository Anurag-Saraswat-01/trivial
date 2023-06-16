import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SocketContext from "../contexts/SocketContext";
import RoomContext from "../contexts/RoomContext";
import WaitingRoom from "../components/WaitingRoom";
import PlayingRoom from "../components/PlayingRoom";
import Leaderboard from "../components/Leaderboard";
import ChatBox from "../components/ChatBox";

const Room = () => {
  const { socket } = useContext(SocketContext);
  const roomID = useParams();
  const [waiting, setWaiting] = useState(true);
  const [roomUsers, setRoomUsers] = useState([]);

  socket.on("roomUsers", (users) => {
    console.log(users);
    setRoomUsers(users);
  });

  return (
    <RoomContext.Provider value={roomID}>
      <Leaderboard />
      {waiting ? <WaitingRoom setWaiting={setWaiting} /> : <PlayingRoom />}
      <ChatBox />
    </RoomContext.Provider>
  );
};

export default Room;
