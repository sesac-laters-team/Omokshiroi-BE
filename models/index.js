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

const roomsModel = require("./Rooms")(sequelize, Sequelize);
const gamesModel = require("./Games")(sequelize, Sequelize);
const boardsModel = require("./Boards")(sequelize, Sequelize);

// 테이블 관계 설정
// rooms <> games
roomsModel.hasOne(gamesModel, {
    foreignKey: {
        name: "room_id",
        allowNull: false,
    },
}); // rooms 테이블과 games 테이블 간의 1:1 관계 설정
gamesModel.belongsTo(roomsModel, {
    foreignKey: {
        name: "room_id",
        allowNull: false,
    },
}); // games 테이블이 rooms 테이블에 속함을 나타냄

// games <> boards
gamesModel.hasOne(boardsModel, {
    foreignKey: {
        name: "game_id",
        allowNull: false,
    },
}); // games 테이블과 boards 테이블 간의 1:1 관계 설정
boardsModel.belongsTo(gamesModel, {
    foreignKey: {
        name: "game_id",
        allowNull: false,
    },
}); // boards 테이블이 games 테이블에 속함을 나타냄

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.roomsModel = roomsModel;
db.gamesModel = gamesModel;
db.boardsModel = boardsModel;

module.exports = db;
