import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from "express";
import http from "http";
import { Server } from "socket.io";

import db from "./src/models/index.js";
import { route } from "./src/routes/index.js";
import { errorHandlerMiddleware } from "./src/middleware/error.middleware.js";
import { authenticateSocket } from "./src/middleware/socket.middleware.js";
import { handleSocketConnection } from "./src/socket/chat.js";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Consider restricting to your frontend's origin, e.g., "http://localhost:3000"
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000, // Increase timeout to handle network delays
  pingInterval: 25000,
});

app.use(
  cors({
    origin: "*", 
  })
);

//io.use(authenticateSocket);

// Apply socket authentication middleware
io.use((socket, next) => {
  console.log('Socket authentication attempt:', socket.handshake.auth);
  authenticateSocket(socket, next);
});

// Log connection errors
io.on("connect_error", (error) => {
  console.error("Socket.io connection error:", error.message);
});

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api", route);
app.use(errorHandlerMiddleware);

try {
  await db.sequelize.sync();
  await db.sequelize.authenticate();
  console.log("Connection has been established successfully.");

  // Socket connection handler
  io.on("connection", (socket) => handleSocketConnection(socket, io));
  // // Start server
  // server.listen(, () => {
  //   console.log(
  //     `Server is running on port http://localhost:${process.env.PORT}`
  //   );
  // });

  server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${process.env.PORT} (accessible on 192.168.1.104:${process.env.PORT})`);
  });

} catch (err) {
  console.error("Unable to connect to the database:", err);
}
