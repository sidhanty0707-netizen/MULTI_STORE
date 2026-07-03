require("dotenv").config();

const http = require("http");
const app = require("./app");

const { initializeSocket } = require("./socket/socket");

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});