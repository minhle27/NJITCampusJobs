import { Server, Socket } from "socket.io";
import http from "http";
import { UserWithId } from "./types";

let io: Server;

interface SocketUserMap {
  [socketId: string]: UserWithId;
}

interface UserSocketMap {
  [userId: string]: Socket;
}

const userToSocketMap: UserSocketMap = {}; // maps user ID to socket object
const socketToUserMap: SocketUserMap = {}; // maps socket ID to user object

const getAllConnectedUsers = (): UserWithId[] => Object.values(socketToUserMap);
const getSocketFromUserID = (userid: string): Socket => userToSocketMap[userid];
const getUserFromSocketID = (socketid: string): UserWithId =>
  socketToUserMap[socketid];
const getSocketFromSocketID = (socketid: string): Socket | undefined =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  io.sockets.sockets.get(socketid);

const removeUser = (user: UserWithId | undefined, socket: Socket) => {
  if (user) {
    delete userToSocketMap[user._id];
  }
  delete socketToUserMap[socket.id];
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

const addUser = (user: UserWithId, socket: Socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

const socketManager = {
  init: (httpServer: http.Server) => {
    io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:5173",
      },
    });

    io.on("connection", (socket: Socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (_reason: string) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,
  getIo: () => io,
};

export default socketManager;
