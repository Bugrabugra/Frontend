import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import { createContext, useContext, useEffect, useState } from "react";
import EVENTS from "../config/events";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  roomId?: string;
  rooms: Record<string, { name: string }>,
  messages?: { message: string, time: string, username: string }[];
  setMessages: Function;
}

const socket = io(SOCKET_URL);
const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  rooms: {},
  messages: [],
  setMessages: () => false
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    }
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);
    setMessages([]);
  });

  socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
    if (!document.hasFocus()) {
      document.title = "New message...";
    }

    setMessages([
      ...messages,
      { message, username, time }
    ]);
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages
      }} {...props}/>
  );
}

export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;
