import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      withCredentials: true,
      transports: ["websocket"],
      reconnection:true,
    });

    socket.on("connect", () => {
      console.log("🟢 SOCKET CONNECTED:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 SOCKET DISCONNECTED");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ SOCKET CONNECTION ERROR:", err.message);
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
