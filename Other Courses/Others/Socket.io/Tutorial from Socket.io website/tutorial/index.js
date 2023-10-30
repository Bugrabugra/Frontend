import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
// import { writeFile } from "fs";
// import { fileURLToPath } from 'url'
// import path from "path";


const app = express();
const httpServer = createServer(app);
const server = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

// app.use(express.static(path.join(__dirname, "tmp")))

// app.get("/", (req, res) => {
//   res.sendFile("./index.html", { root: "." });
// });

server.on("connection", (client) => {
  console.log(client.id, "connected");
  client.emit("hello", "Welcome!");

  client.on("disconnect", () => {
    console.log("user disconnected");
  });

  client.on("chat message", (msg, room) => {
    server.to(room).emit('chat message', msg);
  });

  client.on("join room", (room, id) => {
    client.join(room);
    client.broadcast.to(room).emit("chat message", `${id} has joined room ${room}`);
  });

  // client.on("upload", (file, fileName, callback) => {
  //   console.log(file); // <Buffer 25 50 44 ...>
  //
  //   // save the content to the disk, for example
  //   writeFile(path.join(__dirname, "/tmp", fileName), file, (err) => {
  //     console.log(err)
  //     callback({ message: err ? "failure" : "success" });
  //   });
  // });
});

httpServer.listen(PORT, () => {
  console.log("server running at http://localhost:", PORT);
});
