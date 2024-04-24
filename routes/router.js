const express = require("express");
const router = express.Router();

const roomsCtr = require("../controller/Crooms");

const usersCtr = require("../controller/Cusers");

// rooms
router.get("/rooms", roomsCtr.getAllRooms);

// users
router.get("/users", usersCtr.getAllUsers);

module.exports = router;
