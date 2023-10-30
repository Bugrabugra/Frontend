const socket = io("http://localhost:3000");
const msgBox = document.getElementById("inputMessage");
const msgCont = document.getElementById("messages-container");
const email = document.getElementById("inputEmail");
const sendBtn = document.getElementById("buttonMessage");

// get messages from server
const messages = [];

function getMessages() {
  fetch("http://localhost:3000/api/chat")
    .then((response) => response.json())
    .then((data) => {
      loadData(data);
      data.forEach((el) => messages.push(el));
    })
    .catch((error) => console.error(error));
}

getMessages();

// global send event function to prevent code duplication
function sendEvent(email) {
  sendMessage({ email: email.value, text: msgBox.value });
  msgBox.value = "";
}

// send message when user press enter
msgBox.addEventListener("keydown", (e) => {
  if (e.keyCode !== 13) {
    return;
  }

  sendEvent(email);
});

// send message when user press button
sendBtn.addEventListener("click", () => {
  sendEvent(email);
});

// display messages
function loadData(data) {
  let messages = "";
  data.map((message) => {
    messages += `
      <li class="bg-success p-2 rounded mb-2 text-light">
        <span class="fw-bolder">${message.email}: </span>
        ${message.text}
      </li>
    `;
  });

  msgCont.innerHTML = messages;
}

// for socket.io - emit sendMessage event
function sendMessage(message) {
  socket.emit("sendMessage", message);
}

// listen to recMessage event
socket.on("recMessage", (message) => {
  messages.push(message);
  loadData(messages);
});
