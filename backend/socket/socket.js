import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const userSocketMap = new Map(); // {userId -> socketId}

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    //1️⃣ Cookie string uthao
    const cookieHeader = socket.handshake.headers.cookie;
    // Example: 'token=abc123; other=value'

    if (!cookieHeader) {
      return next(new Error("No cookies found"));
    }

    //2️⃣ Cookie parse karo
    const cookies = cookie.parse(cookieHeader);
    const token = cookies.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    // 3️⃣ Token verify karo
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);

      // 4️⃣ User ko socket pe attach karo
      socket.user = user;

      next(); // ✅ allow connection
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {

    const userId = socket.user.userId;
    userSocketMap.set(userId, socket.id);

    io.emit('getOnlineUsers', Array.from(userSocketMap.keys()))

    socket.on('typing-alert', ({typerId, receiverId}) => {
      socket.to(userSocketMap.get(receiverId)).emit('typing-alert', typerId)
    })
    
    socket.on('disconnect', () => {
        userSocketMap.delete(userId)
        io.emit('getOnlineUsers', Array.from(userSocketMap.keys()))
    })
  });
  io.userSocketMap = userSocketMap
  return io;
};

export default initializeSocket;
