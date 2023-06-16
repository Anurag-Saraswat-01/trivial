import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import SocketContext from "./contexts/SocketContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Room from "./pages/Room";

function App() {
  const [socket, setSocket] = useState(null);
  const [isLeader, setIsLeader] = useState(true);

  useEffect(() => {
    const newSocket = io.connect("http://localhost:5000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isLeader, setIsLeader }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomID" element={<Room />} />
        {/* delete later */}
        <Route path="/room" element={<Room />} />
      </Routes>
      <Footer />
    </SocketContext.Provider>
  );
}

export default App;
