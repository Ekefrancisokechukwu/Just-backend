const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const db = require("./db");
const server = http.createServer(app);

const PORT = 5000;

const io = new Server(server, {
  cors: { origin: "*" },
  connectionStateRecovery: {},
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", async (msg) => {
    console.log("message: " + msg);
    let result;

    try {
      result = await db.query("INSERT INTO messages(content) VALUES ($1)", [
        msg,
      ]);
      console.log(result);
    } catch (error) {
      console.log(error);
      return;
    }
    io.emit("chat message", msg);
  });
});

const start = async () => {
  server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
};

start();
