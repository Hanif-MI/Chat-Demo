import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export function authenticateSocket(socket, next) {
  const token =
  socket.handshake.headers.authorization ??
  socket.handshake.auth.token ??
  socket.handshake.auth.authorization;


  console.log("Token received:", token);

  if (!token) return next(new Error("Token required"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Socket authentication failed:", error.message);
    next(new Error("Authentication error: Invalid token"));
  }
}
