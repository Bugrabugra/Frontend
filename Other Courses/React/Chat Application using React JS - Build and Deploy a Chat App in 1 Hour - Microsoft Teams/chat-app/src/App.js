import {ChatEngine} from "react-chat-engine";
import ChatFeed from "./components/ChatFeed.jsx";

import "./App.css";
import dotenv from "dotenv";
import LoginForm from "./components/LoginForm";
 

dotenv.config();
console.log(process.env.REACT_APP_PROJECTID);

const App = () => {
  if (!localStorage.getItem("username")) {
    return <LoginForm/>
  }

  return (
    <ChatEngine
      height="100vh"
      projectID={process.env.REACT_APP_PROJECTID}
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      renderChatFeed={chatAppProps => <ChatFeed {...chatAppProps}/>}
    />
  )
}

export default App;
