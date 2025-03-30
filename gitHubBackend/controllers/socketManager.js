import { Server } from "socket.io";


export const ConnectToSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
  });

  io.on("connection", (socket)=>{
    socket.on("joinRoom", (userId) => {
      console.log("User joined room: ", userId);
      socket.join(userId);
    })
  })
  
  return io;
}
