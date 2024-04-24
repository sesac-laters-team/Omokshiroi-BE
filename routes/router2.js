const express = require("express");
const router2 = express.Router();

const roomsCtr = require("../controller/Crooms");

// rooms

// 방목록 요청 API
// GET /api-server2/rooms
router.get("/rooms", roomsCtr.getAllRooms);

// 방생성 요청 API
// POST /api-server2/room
// require (title, timer, nickname)
router.post("/room", roomsCtr.createRoom);

// 방 삭제 요청 API
// DELETE /api-server2/room
// require (roomId,nickname)
router.delete("/room", roomsCtr.deleteRoom);

// 방입장 요청 API
// PATCH /api-server2/room/enter
// require (roomId, nickname)
router.patch("/room/enter", roomsCtr.enterRoom);

// 방 퇴장 요청 API
// PATCH /api-server2/room/leave
// 게스트가 브라우저를 종료하거나 나가기를 할때 요청할 API
// require (roomId, nickname)
router.patch("/room/leave", roomsCtr.leaveRoom);

module.exports = router2;
