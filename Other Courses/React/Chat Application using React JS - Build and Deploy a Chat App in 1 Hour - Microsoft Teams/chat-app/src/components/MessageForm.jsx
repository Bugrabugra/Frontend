import {useState} from "react";
import {isTyping, sendMessage} from "react-chat-engine";
import {PictureOutlined, SendOutlined} from "@ant-design/icons";


const MessageForm = (props) => {
  const [value, setValue] = useState("");
  const {chatId, creds} = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = value.trim();
    if (text.length > 0) {
      sendMessage(creds, chatId, {text});
    }
    setValue("");
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    isTyping(props, chatId);
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, {files: event.target.files, text: ""});
  };
  
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon"/>
        </span>
      </label>

      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{display: "none"}}
        onChange={handleUpload}
      />

      <button type="submit" className="send-button">
        <SendOutlined className="send-icon"/>
      </button>
    </form>
  )
};

export default MessageForm;
