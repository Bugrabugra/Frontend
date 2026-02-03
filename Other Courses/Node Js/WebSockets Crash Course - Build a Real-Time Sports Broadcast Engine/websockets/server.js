import {WebSocketServer} from "ws";

const wss = new WebSocketServer({port: 8080});

// connection event
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({message});

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server Broadcast: ${message}`);
      }
    });
  });

  socket.on("error", (error) => {
    console.log(`Error: ${error.message}: ${ip}`);
  });

  socket.on("close", () => {
    console.log(`Client disconnected: ${ip}`);
  });
});

console.log("Server started on port 8080");



