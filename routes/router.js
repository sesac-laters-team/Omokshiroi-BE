const express = require("express");
const router = express.Router();

const usersCtr = require("../controller/Cusers");

// users
router.get("/users", usersCtr.getAllUsers);

module.exports = router;
