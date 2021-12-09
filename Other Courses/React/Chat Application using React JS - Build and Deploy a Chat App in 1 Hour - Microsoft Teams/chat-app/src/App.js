import {ChatEngine} from "react-chat-engine";
import ChatFeed from "./components/ChatFeed.jsx";

import "./App.css";
import dotenv from "dotenv";
 

dotenv.config();
console.log(process.env.REACT_APP_PROJECTID);

const App = () => {
  return (
    <ChatEngine
      height="100vh"
      projectID={process.env.REACT_APP_PROJECTID}
      userName="bugra"
      userSecret="123"
      renderChatFeed={chatAppProps => <ChatFeed {...chatAppProps}/>}
    />
  )
}

export default App;
