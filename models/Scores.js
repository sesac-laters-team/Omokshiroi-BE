const scoresModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "scores",
        {
            score_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            // user_id는 index에서 관계 설정
            win: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            lose: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            rate: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "scores",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = scoresModel;
