const { roomsModel } = require("../models");

// 방 목록 요청 API
// GET /api-server2/rooms
exports.getAllRooms = async (req, res) => {
    try {
        const Rooms = await roomsModel.findAll();
        res.json(Rooms);
    } catch (error) {
        res.status(500).send("server error");
    }
};

// 방 생성 요청 API
// POST /api-server2/room
// require (title, timer, nickname)
exports.createRoom = async (req, res) => {
    const { title, timer, nickname } = req.body;

    try {
        // 방제목 중복 조회 로직
        const isExist = await roomsModel.findOne({
            where: {
                title: title,
            },
        });

        if (isExist)
            return res.json({
                isSuccess: false,
                msg: "이미 존재하는 방 이름입니다.",
                data: null,
            });

        // 방 생성
        const newRoom = await roomsModel.create({
            title: title,
            creator_user: nickname,
            timer_second: timer,
        });

        res.json({
            isSuccess: true,
            msg: "방 생성 성공",
            data: newRoom,
        });
    } catch (error) {
        res.status(500).send("server error");
    }
};

// 방 삭제 요청 API
// DELETE /api-server2/room
// require (roomId,nickname)
exports.deleteRoom = async (req, res) => {
    const { roomId, nickname } = req.body;

    try {
        // 방 번호로 조회
        const isCreator = await roomsModel.findOne({
            where: {
                room_id: roomId,
            },
        });

        // 올바르지 않은 방번호 예외처리
        if (!isCreator)
            return res.status(404).json({
                isSuccess: false,
                msg: "존재하지 않는 방입니다.",
            });

        // 방장이 아닐경우 예외처리
        if (isCreator.creator_user !== nickname)
            return res.json({
                isSuccess: false,
                msg: "방장만 방을 삭제할 수 있습니다.",
            });

        // 방 삭제
        const destroyRoom = await roomsModel.destroy({
            where: {
                room_id: roomId,
            },
        });
        res.json({
            isSuccess: true,
            msg: "방 삭제 성공",
            data: destroyRoom, // 1 삭제된데이터 있음 / 0 없음
        });
    } catch (error) {
        res.status(500).send("server error");
    }
};

// 방 입장 요청 API
// PATCH /api-server2/room/enter
// require (roomId, nickname)
exports.enterRoom = async (req, res) => {
    const { roomId, nickname } = req.body;
    try {
        // 방인원 조회 후 참가 가능 여부 결정 로직
        const count = await roomsModel.findOne({
            where: {
                room_id: roomId,
            },
        });

        if (
            count.player_count === 2 ||
            count.creator_user === nickname ||
            count.guest !== null
        )
            return res.json({
                isSuccess: false,
                msg: "방이 가득 찼거나, 이미 만든 방이 있습니다.",
                data: null,
            });

        // 방의 참가인원 컬럼 수정 코드
        const updateCount = await roomsModel.update(
            {
                player_count: 2,
                guest: nickname,
            },
            {
                where: {
                    room_id: roomId,
                },
            }
        );
        res.json({
            isSuccess: true,
            msg: "입장 성공",
            data: updateCount,
        });
    } catch (error) {
        res.status(500).send("server error");
    }
};

// 방 퇴장 요청 API
// PATCH /api-server2/room/leave
// 게스트가 브라우저를 종료하거나 나가기를 할때 요청할 API
// require (roomId, nickname)
exports.leaveRoom = async (req, res) => {
    const { roomId, nickname } = req.body;

    try {
        // 방인원 조회 후 생성자가 아닌 게스트인지 아닌지 확인하는 로직
        const count = await roomsModel.findOne({
            where: {
                room_id: roomId,
            },
        });
        // 방장이 퇴장 요청을 보내거나 방장만 방에 있을 경우
        if (
            count.player_count === 1 ||
            count.creator_user === nickname ||
            count.guest === null
        )
            return res.json({
                isSuccess: false,
                msg: "방장은 퇴장할 수 없거나 참여인원은 0명이 될 수 없습니다.",
                data: null,
            });

        // 방의 참가인원 컬럼 수정 코드
        const updateCount = await roomsModel.update(
            {
                player_count: 1,
                guest: null,
            },
            {
                where: {
                    room_id: roomId,
                },
            }
        );
        res.json({
            isSuccess: true,
            msg: "퇴장 성공",
            data: updateCount,
        });
    } catch (error) {
        res.status(500).send("server error");
    }
};
