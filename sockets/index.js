const socketIO = require("socket.io");

function socketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on("connection", (socket) => {
        socket.on();

        // 클라이언트 연결 해제
        console.log("socket connection success");
    });
}

module.exports = socketHandler;
