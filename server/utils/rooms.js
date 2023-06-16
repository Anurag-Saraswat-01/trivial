const rooms = {};
const users = [];

function createUser(id, name, room) {
  const user = { id, name, room };
  users.push(user);
  return user;
}

function createRoom(roomID, category, leader) {
  rooms[roomID] = {
    roomID: roomID,
    category: JSON.parse(category),
    leader: leader,
    users: [],
  };
  console.log("Room Created", rooms[roomID]);
}

function roomIsPresent(roomID) {
  return Object.keys(rooms).includes(roomID);
}

function joinRoom(user, roomID) {
  rooms[roomID].users.push(user);
  console.log(`${user.name} joined ${roomID}`);
}

module.exports = { rooms, createUser, createRoom, roomIsPresent, joinRoom };
