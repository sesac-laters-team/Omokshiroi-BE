const { usersModel } = require("../models");

exports.test = (req, res) => {
    res.json("hello world");
};

exports.getAllusers = async (req, res) => {
    try {
        const allUsers = await usersModel.findAll();
        res.json(allUsers);
    } catch (error) {
        res.status(500).send("server error");
    }
};
