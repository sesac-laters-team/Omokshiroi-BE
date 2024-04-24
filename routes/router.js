const express = require("express");
const router = express.Router();

const roomsCtr = require("../controller/Crooms");

// rooms
router.get("/rooms", roomsCtr.getAllRooms);

module.exports = router;
