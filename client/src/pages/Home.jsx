import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SocketContext from "../contexts/SocketContext";

const Home = () => {
  const { socket, setIsLeader } = useContext(SocketContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [roomAction, setRoomAction] = useState("");

  // generate a random 8 character id
  const generateRoomID = () => {
    const id = (Math.floor(Math.random() * 10e10) + Date.now()).toString(36);
    return id;
  };

  // form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomAction === "create") {
      let id = generateRoomID();
      socket.emit("createRoom", { category, id }, (res) => {
        console.log(res);
        setIsLeader(true);
        joinRoom(id);
      });
    }
    if (roomAction === "join") {
      joinRoom(roomID);
    }
  };

  const joinRoom = (roomID) => {
    console.log(roomID);
    socket.emit("joinRoom", { name, roomID }, (res) => {
      console.log(res);
      if (res.status === 200) navigate(`room/${roomID}`);
      else alert("Room Doesn't Exist");
    });
  };

  // name handler
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // room id handler
  const handleRoomIDChange = (e) => {
    setRoomID(e.target.value);
  };

  // category handler
  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  //   get categories from api
  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => {
        setCategories(res.data.trivia_categories);
      })
      .catch((err) => console.log(err));
  }, []);

  //   button to switch to create form
  const createBtn = (
    <button onClick={() => setRoomAction("create")}>Create a room</button>
  );

  //   button to switch to join form
  const joinBtn = (
    <button onClick={() => setRoomAction("join")}>Join a room</button>
  );

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        {/* dynamic form */}
        {roomAction === "" ? (
          // default options
          <div>
            {createBtn}
            <h2>OR</h2>
            {joinBtn}
          </div>
        ) : roomAction === "join" ? (
          // join room form
          <div>
            {createBtn}
            <div>
              <label htmlFor="room_id">Room ID:</label>
              <input
                type="text"
                id="room_id"
                name="room_id"
                value={roomID}
                onChange={handleRoomIDChange}
                required
              />
              <button type="submit">Join</button>
            </div>
          </div>
        ) : roomAction === "create" ? (
          // create room form
          <div>
            {joinBtn}
            <div>
              <label htmlFor="category">Category:</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select</option>
                {/* map over categories to create options */}
                {categories.map((c) => (
                  <option key={c.id} value={JSON.stringify(c)}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button type="submit">Create</button>
            </div>
          </div>
        ) : null}
      </form>
    </main>
  );
};

export default Home;
