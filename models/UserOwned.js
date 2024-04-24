const userOwnedModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "user_owned",
        {
            owned_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            // 연결 테이블, user_id와 product_id는 index에서 관계 설정
        },
        {
            tableName: "user_owned",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = userOwnedModel;
