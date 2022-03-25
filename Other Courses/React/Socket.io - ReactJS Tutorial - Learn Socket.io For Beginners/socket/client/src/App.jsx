import './App.css'
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      console.log(room)
    }
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageReceived(message);
    })
  }, [socket]);


  return (
    <div className="App">
      <input placeholder="Room number..." onChange={(e) => setRoom(e.target.value)}/>
      <button onClick={joinRoom}>Join Room</button>

      <input type="text" placeholder="Message..." onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send Message</button>

      <h1>Message</h1>
      {messageReceived}
    </div>
  )
}

export default App
