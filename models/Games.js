const gamesModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "games",
        {
            game_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            current_player: {
                type: DataTypes.STRING(255),
                allowNull: true, // 게임 시작시 현재 플레이어 정보가 넘어오므로 true 설정
            },
            game_status: {
                type: DataTypes.ENUM("wait", "ingame"),
                allowNull: false,
                defaultValue: "wait",
            },
            white_player: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            black_player: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            timer_second: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "games",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = gamesModel;
