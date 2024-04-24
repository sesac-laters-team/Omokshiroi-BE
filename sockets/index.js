const socketIO = require("socket.io");

function socketHandler(server) {
    const io = socketIO(server, { cors: { origin: "http://localhost:3000" } });
    let publicRoom = [{
        name: "AlphaRoom",
        blackPlayer: "player1_id",
        whitePlayer: "player2_id",
        takes: [
            { x: 3, y: 4, player: "black" },
            { x: 4, y: 5, player: "white" },
            { x: 5, y: 6, player: "black" },
        ]
    }];

    function logEvent(event, socket) {
        console.log(`Socket event: ${event} from ${socket.id}`);
    }

    function getRoomByName(name) {
        return publicRoom.find(room => room.name === name);
    }

    function emitRoomEvent(room, event, data) {
        io.in(room.name).emit(event, data);
    }

    io.on("connection", (socket) => {
        socket.onAny(event => logEvent(event, socket));

        socket.on("room_list", () => {
            socket.emit("room_list", publicRoom);
        });

        socket.on("room_new", (name) => {
            name = name.trim();
            if (socket.rooms.size > 1 || getRoomByName(name)) {
                socket.emit("error", "Cannot join multiple rooms or room already exists.");
                return;
            }
            let roomInfo = { name, blackPlayer: "", whitePlayer: "", takes: [] };
            publicRoom.push(roomInfo);
            emitRoomEvent(io.sockets, "room_list", publicRoom);
            socket.join(name);
            emitRoomEvent(io.to(name), "message", `${socket.id} has entered the room.`);
        });

        socket.on("room_enter", (name) => {
            if (socket.rooms.size > 1 || !getRoomByName(name)) {
                socket.emit("error", "Already in a room or room does not exist.");
                return;
            }
            socket.join(name);
            emitRoomEvent(io.to(name), "message", `${socket.id} has entered the room.`);
        });

        socket.on("room_leave", () => {
            const rooms = Array.from(socket.rooms).slice(1);
            rooms.forEach(name => {
                socket.leave(name);
                emitRoomEvent(io.to(name), "message", `${socket.id} has left the room.`);
            });
        });

        socket.on("player_change", (color) => {
            const room = getRoomByName(Array.from(socket.rooms)[1]);
            if (!room || room[color + "Player"]) {
                socket.emit("error", "Room does not exist or color already taken.");
                return;
            }
            room[color + "Player"] = socket.id;
            emitPlayerChange(room);
        });
        
        socket.on("start_game", () => {
            const room = getRoomByName(Array.from(socket.rooms)[1]);
            if (!room || room.blackPlayer === "" || room.whitePlayer === "") {
                socket.emit("error", "Cannot start game, players are not ready.");
                return;
            }
        
            // 게임 시작 로직 추가
            startGameLogic(room);
        });
        
        function startGameLogic(room) {
            // 플레이어에게 차례 알려주기
            emitRoomEvent(io.to(room.name), "player_select");
        }
        

        socket.on("player_selected", (coord) => {
            const room = getRoomByName(Array.from(socket.rooms)[1]);
            if (!room || room.takes.find(t => t.x === coord.x && t.y === coord.y)) {
                socket.emit("error", "Room does not exist or position already taken.");
                return;
            }
            room.takes.push(coord);
            if (checkOmokCompleted(coord, room.takes)) {
                emitRoomEvent(io.to(room.name), "game_end", room.takes.length % 2 === 0 ? "black" : "white");
            }
        });

        socket.on("disconnecting", () => {
            console.log(`Socket ${socket.id} is disconnecting.`);
        });
    });
}

module.exports = socketHandler;
