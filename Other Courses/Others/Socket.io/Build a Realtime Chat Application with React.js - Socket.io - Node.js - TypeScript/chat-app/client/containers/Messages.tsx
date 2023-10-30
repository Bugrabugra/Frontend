import { useEffect, useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";
import styles from "../styles/Messages.module.css";

const MessagesContainer = () => {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    const message = newMessageRef.current?.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`
      }
    ]);

    newMessageRef.current.value = "";
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!roomId) {
    return <div/>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages?.map(({ message, username, time }, index) => {
          return (
            <div key={index} className={styles.message}>
              <div className={styles.messageInner}>
                <span className={styles.messageSender}>{username} - {time}</span>
                <span className={styles.messageBody}>{message}</span>
              </div>
            </div>
          )
        })}
        <div ref={messageEndRef}/>
      </div>

      <div className={styles.messageBox}>
        <textarea placeholder="Tell us what you are thinking" ref={newMessageRef} rows={1}/>
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  );
};

export default MessagesContainer;
