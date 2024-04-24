const boardsModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "boards",
        {
            board_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            move_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            position: {
                type: DataTypes.JSON,
                allowNull: false,
            },
        },
        {
            tableName: "boards",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = boardsModel;
