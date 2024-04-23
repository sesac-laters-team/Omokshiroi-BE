const socketIO = require("socket.io");

function socketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on("connection", (socket) => {
        // 소켓 연결 시 테스트
        console.log("클라이언트 아이디 ::: ", socket.id);

        socket.on("test", (message) => {
            console.log("클라이언트 메시지 ::: ", message);
            socket.emit("resTest", "res_" + message);
        });

        // 클라이언트 연결 해제
        // console.log("socket connection success");


        // [WaitingRoom Socket]
        // 방 만들기
        socket.on("createRoom", (title) => {
            console.log(`${socket.id}의 제목은 ${title}입니다.`)
        });
    });
}

module.exports = socketHandler;
