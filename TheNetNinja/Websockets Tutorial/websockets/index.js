const express = require("express");
const socket = require("socket.io");
const path = require('path');

// App setup
const app = express();
const server = app.listen(4000, () => {
  console.log("listening to requests on: http://localhost:4000");
});

// Static files
app.use(express.static('public', express.static(path.join(__dirname, "public"))));

// Socket setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  // Handle chat event
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  })

  // Handle typing event
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  })
})
