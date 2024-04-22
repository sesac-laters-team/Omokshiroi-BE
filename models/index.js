const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
require("dotenv").config();

const db = {};

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    config
);

const usersModel = require("./Users")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.usersModel = usersModel;

module.exports = db;
