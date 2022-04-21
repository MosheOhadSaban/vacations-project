const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
const jwt_decode = require("jwt-decode");
const crypto = require("crypto");

io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let userIdToSocketsMap = new Map();
let userId;

io.on("connection", (socket) => {
  console.log("Connection request ");
  let tokenString = socket.handshake.auth;
  tokenString = tokenString.token;
  let decodedToken = jwt_decode(tokenString);
  userId = decodedToken.userId;

  console.log("User id: " + userId);
  socket.id = crypto.randomBytes(16).toString("hex");

  userIdToSocketsMap.set(userId, socket);
  console.log(
    "One client has been connected... Total clients: " + userIdToSocketsMap.size
  );

  socket.on("disconnect", () => {
    // A valid userId means the user clicked "logout"

    userIdToSocketsMap.delete(userId);
    console.log(
      userId +
        " client has been disconnected. Total clients: " +
        userIdToSocketsMap.size
    );
  });
});

function broadcastExceptSender(actionName, parameters, senderId) {
  for (let [userId, socket] of userIdToSocketsMap) {
    if (userId !== senderId) {
      socket.emit(actionName, parameters);
    }
  }
}

server.listen(8000, () => console.log("Listening on http://localhost:8000"));

module.exports = {
  broadcastExceptSender,
};
