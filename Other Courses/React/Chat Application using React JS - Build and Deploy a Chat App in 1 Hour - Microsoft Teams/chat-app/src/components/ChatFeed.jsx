const ChatFeed = (props) => {
  const {chats, activeChat, userName, messages} = props;
  const chat = chats && chats[activeChat];

  console.log(chat, userName, messages);

  return (
    <div>
      
    </div>
  )
}

export default ChatFeed;
