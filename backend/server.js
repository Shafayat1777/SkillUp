require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const path = require("path"); // Add this line
const cors = require("cors");
const socket = require("socket.io");
// express app
const app = express();

// cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// middeleware
app.use(express.json()); // convers all request to json format

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Serve static files from "backend/uploads" folder
app.use("/uploads", express.static(path.join("uploads")));

// routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// listen for requests
const server = app.listen(process.env.PORT, () => {
  console.log("listening on port! http://localhost:" + process.env.PORT);
});

// initialize socket
const io = socket(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// listen on connection
io.on("connection", (socket) => {
  console.log("Made connection id:" + socket.id);
  
  // Handle chat event
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on('typing', (data) =>{
    socket.broadcast.emit('typing', data)
  })
});
