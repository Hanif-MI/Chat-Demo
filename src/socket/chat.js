import { findRoomIdByUserPair } from "../services/chat.service.js";
import { insertMessage } from "../services/message.service.js";

const SOCKET_CHANNEL = {
  JOIN_CHAT: "joinChat",
  MESSAGE: "message",
  ROOM: "room",
};

const handleSocketConnection = (socket, io) => {
  console.log(`User connected: ${socket.userId}, socket ID: ${socket.id}`);
  
  socket.on(SOCKET_CHANNEL.JOIN_CHAT, handleJoinChat(socket));
  socket.on(SOCKET_CHANNEL.MESSAGE, handleSocketMessage(socket, io));
  
  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.userId}, reason: ${reason}`);
  });
};

const handleJoinChat = (socket) => {
  return async ({ otherUserId }) => {
    try {
      if (otherUserId === socket.userId) {
        socket.emit("error", { message: "You cannot chat with yourself" });
        return;
      }
      const room = await findRoomIdByUserPair(otherUserId, socket.userId);
      if (!room) {
        socket.emit("error", { message: "Chat room not found" });
        return;
      }
      socket.join(room);
      console.log(`User ${socket.userId} joined room: ${room}`);
      socket.emit(SOCKET_CHANNEL.ROOM, { room });
    } catch (error) {
      console.error(`Error in joinChat for user ${socket.userId}:`, error);
      socket.emit("error", { message: "Failed to join chat" });
    }
  };
};

const handleSocketMessage = (socket, io) => {
  return async ({ toUserId, text }) => {
    try {
      const room = await findRoomIdByUserPair(toUserId, socket.userId);
      if (!room) {
        socket.emit("error", { message: "Chat room not found" });
        return;
      }
      await handleMessage(io, { userId: socket.userId, room, text });
    } catch (error) {
      console.error(`Error in message for user ${socket.userId}:`, error);
      socket.emit("error", { message: "Failed to send message" });
    }
  };
};

const handleMessage = async (io, { userId, room, text }) => {
  try {
    const msg = await insertMessage({ userId, room, text });
    io.to(room).emit("message", {
      id: msg.id,
      userId: msg.userId,
      text: msg.text,
      createdAt: msg.createdAt,
    });
    console.log(`Message sent to room ${room} by user ${userId}: ${text}`);
  } catch (error) {
    console.error(`Error saving message for user ${userId}:`, error);
    io.to(room).emit("error", { message: "Failed to save message" });
  }
};

export {
  handleSocketConnection,
  handleJoinChat,
  handleSocketMessage,
  handleMessage,
};