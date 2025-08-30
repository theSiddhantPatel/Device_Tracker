const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  // console.log("connected");
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", function (req, res) {
  res.render("index");
});

// Listen using the HTTP server (required for Socket.IO to work properly)
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
