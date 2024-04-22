const usersModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "test_table_users",
        {
            users_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            users_email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            users_password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "test_table_users",
            timestamps: false,
            freezeTableName: true,
            // underscored: true,
        }
    );
    return model;
};

module.exports = usersModel;
