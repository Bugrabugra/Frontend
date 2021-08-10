const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);


const users = [];
const messages = [];
let index = 0;

io.on("connection", socket => {
  socket.emit("loggedIn", {
    users: users.map(s => s.username),
    messages: messages
  });

  socket.on("newUser", username => {
    console.log(`${username} has arrived at the party`);
    socket.username = username;
    users.push(socket);

    io.emit("userOnline", socket.username);
  });

  socket.on("msg", msg => {
    const message = {
      index: index,
      username: socket.username,
      msg: msg
    }

    messages.push(message);

    io.emit("msg", message);
    index++;
  })

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.username} has left the party`);
    io.emit("userLeft", socket.username);
    users.splice(users.indexOf(socket), 1);
  });
})

http.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
})

