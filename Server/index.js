const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const router = require("./Router/Router");
const { addUser, getUser, getUsersInRoom, removeUser } = require("./user");

const app = express();
app.use(cors());
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(" New client connected");

  socket.on("join", ({ name, room }) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      console.log("Join error:", error);
      return;
    }

    socket.join(user.room);

    
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

  
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the room.`,
    });

  
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
      });

      
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    } else {
      console.log(" No user found for socket ID:", socket.id);
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the room.`,
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }

    console.log(" User disconnected");
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
