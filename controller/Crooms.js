const { roomsModel } = require("../models");

exports.getAllRooms = async (req, res) => {
    try {
        const Rooms = await roomsModel.findAll();
        res.json(Rooms);
    } catch (error) {
        res.status(500).send("server error");
    }
};
