const express = require("express");
const app = express();
const router = require("./routes/router");
const { sequelize } = require("./models");
const http = require("http");
const server = http.createServer(app);
const socketHandler = require("./sockets/index");
const cors = require("cors");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
socketHandler(server);
// 라우터 설정
app.use("/api-server", router);

// 시퀄라이즈
sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server open");
        });
    })
    .catch((err) => {
        console.log(err);
    });
