const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");


const users = [];
let messages = [];

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/chatapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.log(error);
  });

// MongoDB Schema/Model
const ChatSchema = mongoose.Schema({
  username: String,
  msg: String
});

const ChatModel = mongoose.model("chat", ChatSchema);

ChatModel.find((error, result) => {
  if (error) {
    throw error;
  }
  messages = result;
})

// Socket.io
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
    const message = new ChatModel({
      username: socket.username,
      msg: msg
    });

    message.save((error, result) => {
      if (error) {
        throw error;
      }
      messages.push(result);

      io.emit("msg", result);
    });

    // messages.push(message);
    //
    // io.emit("msg", message);
    // index++;
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

