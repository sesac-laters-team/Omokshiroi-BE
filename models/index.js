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

const usersModel = require("./Users")(sequelize, Sequelize);
const friendsModel = require("./Friends")(sequelize, Sequelize);
const scoresModel = require("./Scores")(sequelize, Sequelize);
const productsModel = require("./ShopProducts")(sequelize, Sequelize);
const userOwnedModel = require("./UserOwned")(sequelize, Sequelize);

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

// user 테이블 관계 설정
// users > friends
usersModel.hasMany(friendsModel, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
});
friendsModel.belongsTo(usersModel, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
});

// users > score
usersModel.hasOne(scoresModel, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
});
scoresModel.belongsTo(usersModel, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
});

// users <> product_id
usersModel.belongsToMany(productsModel, {
    through: userOwnedModel,
    foreignKey: "user_id",
});
productsModel.belongsToMany(usersModel, {
    through: userOwnedModel,
    foreignKey: "product_id",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.roomsModel = roomsModel;
db.gamesModel = gamesModel;
db.boardsModel = boardsModel;
db.usersModel = usersModel;
db.friendsModel = friendsModel;
db.scoresModel = scoresModel;
db.productsModel = productsModel;
db.userOwnedModel = userOwnedModel;

module.exports = db;
