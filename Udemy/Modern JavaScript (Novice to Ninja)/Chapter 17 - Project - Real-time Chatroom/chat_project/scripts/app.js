// DOM queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMessage = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
const roomName = document.querySelector(".room-name");

// Add a new chat
newChatForm.addEventListener("submit", evt => {
  evt.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err))
});

// Update username
newNameForm.addEventListener("submit", evt => {
  evt.preventDefault();
  // Update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // Reset the form
  newNameForm.reset();
  // Show then hide the update message
  updateMessage.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMessage.innerText = "", 3000);
});

// Update the chat room
rooms.addEventListener("click", evt => {
  if (evt.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(evt.target.getAttribute("id"));
    roomName.innerText = evt.target.getAttribute("id");
    chatroom.getChats((chat) => {
      chatUI.render(chat);
    });
  }
});

// Check local storage for a name
const username = localStorage.username ? localStorage.username : "anonymous";

// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

// Get chats and render
chatroom.getChats((data) => {
  chatUI.render(data);
});