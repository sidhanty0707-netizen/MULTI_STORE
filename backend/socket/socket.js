let io;

const initializeSocket = (server) => {
 console.log("Socket Initialized");

    const { Server } = require("socket.io");

    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PATCH"]
        }
    });

    io.on("connection", (socket) => {

        console.log("Client Connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Client Disconnected:", socket.id);
        });

    });

};

const getIO = () => {

    if (!io) {
        throw new Error("Socket.IO not initialized");
    }

    return io;
};

module.exports = {
    initializeSocket,
    getIO
};