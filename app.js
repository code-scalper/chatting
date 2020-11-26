const path = require("path");
const http = require("http");
const express = require("express");
const socket_io = require("socket.io");
const app = express();
const server = http.createServer(app);
const moment = require("moment");

const io = socket_io(server);

app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(new Date()).format("h:mm A"),
    });
  });
});

server.listen(PORT, () => console.log(`server listening on ${PORT}`));
