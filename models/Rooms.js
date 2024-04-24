const roomsModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "rooms",
        {
            room_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            creator_user: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            guest: {
                type: DataTypes.STRING(255),
                allowNull: true,
                unique: true,
            },
            player_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            timer_second: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "rooms",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = roomsModel;
