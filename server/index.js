const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const {
  rooms,
  createUser,
  createRoom,
  roomIsPresent,
  joinRoom,
} = require("./utils/rooms");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // new room created
  socket.on("createRoom", ({ category, id }, callback) => {
    createRoom(id, category, socket.id);
    callback({
      status: 200,
      statusText: "OK",
      message: "Room Created Successfully",
    });
  });

  // user joins a room
  socket.on("joinRoom", ({ name, roomID }, callback) => {
    if (roomIsPresent(roomID)) {
      const user = createUser(socket.id, name, roomID);
      joinRoom(user, roomID);
      socket.join(user.room);

      io.to(user.room).emit("roomUsers", rooms[user.room].users);

      callback({
        status: 200,
        statusText: "OK",
        message: "Room Joined Successfully",
      });
    } else {
      callback({
        status: 404,
        statusText: "Not Found",
        message: "Room Doesn't Exist",
      });
    }
  });

  // user disconnects
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(5000, () => {
  console.log("SERVER IS RUNNING");
});
