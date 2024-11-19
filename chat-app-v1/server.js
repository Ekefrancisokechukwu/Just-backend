const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const server = http.createServer(app);

const PORT = 5000;

const io = new Server(server, {
  cors: { origin: "*" },
});

const start = async () => {
  // await connectDB(process.env.MONGO_URI as string);
  io.on("connection", (socket) => console.log("a user connected"));
  server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
};

start();
