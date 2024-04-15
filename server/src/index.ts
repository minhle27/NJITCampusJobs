import app from "./app";
import socketManager from "./server-socket";
import config from "./utils/config";
import http from "http";

const server = new http.Server(app);
socketManager.init(server);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
