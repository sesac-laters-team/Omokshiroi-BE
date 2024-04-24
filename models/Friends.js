const friendsModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "friends",
        {
            friends_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            // user_id는 index에서 관계 설정
            friend_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            joined: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            tableName: "friends",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = friendsModel;
