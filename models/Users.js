const usersModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "users",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            id: {
                type: DataTypes.STRING(64),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(64),
                allowNull: false,
                unique: true,
            },
            shop_point: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            // 유저가 구매해서 설정한 커스텀들 중 선택한 커스텀
            // ex) '{"profile": 1, "stone": 1}'
            custom: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            // 온라인 오프라인
            connecting: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            // x: 온라인 or 오프라인, wait: 게임 시작 대기, game: 게임 중, observe: 관전 중
            status: {
                type: DataTypes.ENUM("x", "wait", "game", "observe"),
                allowNull: false,
            },
        },
        {
            tableName: "users",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = usersModel;
