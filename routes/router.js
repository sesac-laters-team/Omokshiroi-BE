const express = require("express");
const router = express.Router();

const testCtr = require("../controller/Ctest");

// test
router.get("/test", testCtr.test);
router.get("/users", testCtr.getAllusers);

module.exports = router;
//
