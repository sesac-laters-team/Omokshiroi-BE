const express = require("express");
const router2 = express.Router();

const roomsCtr = require("../controller/Crooms");

/**
 * @swagger
 * /api-server2/rooms:
 *   get:
 *     summary: 방 목록 요청
 *     description: 대기실 페이지 방 목록 요청 API.
 *     tags: [Rooms]
 *     responses:
 *       '200':
 *         description: 요청 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *             example:
 *               - room_id: 1
 *                 title: "Room1"
 *                 creator_user: "User1"
 *                 guest: "User2"
 *                 player_count: 2
 *                 timer_second: 30
 *               - room_id: 2
 *                 title: "Room2"
 *                 creator_user: "User2"
 *                 guest: null
 *                 player_count: 1
 *                 timer_second: 60
 *               - room_id: 3
 *                 title: "Room3"
 *                 creator_user: "User3"
 *                 guest: null
 *                 player_count: 2
 *                 timer_second: 90
 *       '404':
 *         description: 방 목록이 없는 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: null
 *                 example: {}
 */
router2.get("/rooms", roomsCtr.getAllRooms);

/**
 * @swagger
 * /api-server2/room:
 *   post:
 *     summary: 방 생성 요청
 *     description: 방 만들기 버튼 클릭 시 방 생성 요청 API
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - timer
 *               - nickname
 *             properties:
 *               title:
 *                 type: string
 *                 description: 방의 제목.
 *               timer:
 *                 type: integer
 *                 description: 방의 타이머 설정 (초).
 *               nickname:
 *                 type: string
 *                 description: 방을 생성하는 사용자의 닉네임.
 *     responses:
 *       '200':
 *         description: 방 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                   description: 요청의 성공 여부.
 *                 msg:
 *                   type: string
 *                   example: "방 생성 성공"
 *                   description: 응답 메시지.
 *                 data:
 *                   type: object
 *                   properties:
 *                     player_count:
 *                       type: integer
 *                       example: 1
 *                       description: 방에 참여한 플레이어 수.
 *                     room_id:
 *                       type: integer
 *                       example: 4
 *                       description: 생성된 방의 고유 ID.
 *                     title:
 *                       type: string
 *                       example: "Room4"
 *                       description: 생성된 방의 제목.
 *                     creator_user:
 *                       type: string
 *                       example: "User4"
 *                       description: 방을 생성한 사용자의 닉네임.
 *                     timer_second:
 *                       type: string
 *                       example: "30"
 *                       description: 방의 타이머 설정 (초).
 *       '404':
 *         description: 이미 존재하는 방 이름일 때
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                   description: 요청의 성공 여부.
 *                 msg:
 *                   type: string
 *                   example: "이미 존재하는 방 이름입니다."
 *                   description: 응답 메시지.
 */
router2.post("/room", roomsCtr.createRoom);

/**
 * @swagger
 * /api-server2/room:
 *   delete:
 *     summary: 방 삭제 요청
 *     description: 방장이 나가기 버튼을 누르거나 소켓 disconnect시 요청 API
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - nickname
 *             properties:
 *               roomId:
 *                 type: integer
 *                 description: 삭제할 방의 ID
 *                 example: 1
 *               nickname:
 *                 type: string
 *                 description: 유저 닉네임
 *                 example: "User1"
 *     responses:
 *       200:
 *         description: 방 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                   description: 성공 여부
 *                 msg:
 *                   type: string
 *                   example: "방 삭제 성공"
 *                   description: 삭제 결과에 대한 메시지
 *                 data:
 *                   type: integer
 *                   example: 1
 *                   description: 삭제된 방의 수
 *       403:
 *         description: 방장이 아닌 손님이 방 삭제 요청을 보냈을 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부
 *                 msg:
 *                   type: string
 *                   example: "방장만 방을 삭제할 수 있습니다."
 *                   description: 삭제 거부 메시지
 *       404:
 *         description: 삭제하려는 방이 존재하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부
 *                 msg:
 *                   type: string
 *                   example: "존재하지 않는 방입니다."
 *                   description: 존재하지 않는 방에 대한 메시지
 */
router2.delete("/room", roomsCtr.deleteRoom);

/**
 * @swagger
 * /api-server2/room/enter:
 *   patch:
 *     summary: 방 입장 요청
 *     description: 방 입장 요청 API입니다. 요청 바디에 roomId와 nickname을 전송하여 방에 입장합니다.
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - nickname
 *             properties:
 *               roomId:
 *                 type: integer
 *                 description: 입장할 방의 ID.
 *                 example: 123
 *               nickname:
 *                 type: string
 *                 description: 입장하는 사용자의 닉네임.
 *                 example: "User123"
 *     responses:
 *       200:
 *         description: 입장에 성공하였습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                   description: 성공 여부를 나타냅니다.
 *                 msg:
 *                   type: string
 *                   example: "입장 성공"
 *                   description: 응답 메시지입니다.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: 1
 *                   description: 변경된 데이터의 수입니다.
 *       404:
 *         description: 방에 입장할 수 없는 경우입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부를 나타냅니다.
 *                 msg:
 *                   type: string
 *                   example: "방이 가득 찼거나, 이미 만든 방이 있습니다."
 *                   description: 응답 메시지입니다.
 *                 data:
 *                   type: null
 *                   description: 데이터가 없습니다.
 *                   example: null
 */
router2.patch("/room/enter", roomsCtr.enterRoom);

/**
 * @swagger
 * /api-server2/room/leave:
 *   patch:
 *     summary: 방 퇴장 요청
 *     description: 게스트가 브라우저를 종료하거나 나가기를 할 때 요청하는 API
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - nickname
 *             properties:
 *               roomId:
 *                 type: integer
 *                 description: 퇴장할 방의 ID.
 *                 example: 123
 *               nickname:
 *                 type: string
 *                 description: 퇴장하는 사용자의 닉네임.
 *                 example: "User123"
 *     responses:
 *       200:
 *         description: 퇴장 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                   description: 성공 여부
 *                 msg:
 *                   type: string
 *                   example: "퇴장 성공"
 *                   description: 응답 메시지
 *                 data:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: 1
 *                   description: 변경된 데이터의 수
 *       404:
 *         description: 방 퇴장에 실패한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부
 *                 msg:
 *                   type: string
 *                   example: "방장은 퇴장할 수 없거나 참여인원은 0명이 될 수 없습니다."
 *                   description: 실패 메시지
 *                 data:
 *                   type: null
 *                   example: null
 *                   description: 데이터가 없음
 */
router2.patch("/room/leave", roomsCtr.leaveRoom);

// 에러 페이지
router2.get("*", (req, res) => {
    res.status(404).json({
        msg: "요청 API를 찾을 수 없습니다.",
    });
});

// games ---------------------------------------

module.exports = router2;
