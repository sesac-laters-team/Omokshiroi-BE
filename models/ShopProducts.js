const productsModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "shop_products",
        {
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            product_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "기본",
            },
            product_img: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "default",
            },
            product_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "shop_products",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = productsModel;
