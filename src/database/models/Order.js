module.exports = (sequelize, dataTypes) => {
    let alias ="Order";
    let cols ={
        id : {
            autoIncrement : true,
            primaryKey : true,
            type: dataTypes.INTEGER
        },
        price : {
                allowNull :false,
                type: dataTypes.DECIMAL
        }
        };
    let config ={
        tableName :"Orders",
        timestamps : false,
    };
    const OrderModel = sequelize.define(alias, cols, config);
    return OrderModel;
}