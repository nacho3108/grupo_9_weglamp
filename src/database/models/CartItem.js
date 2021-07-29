module.exports = (sequelize, dataTypes) => {
    let alias ="CartItems";
    let cols ={
        id : {
            autoIncrement : true,
            primaryKey : true,
            type: dataTypes.INTEGER
        },
        userId : {
            allowNull:false,
            type: dataTypes.INTEGER
        },
        domeId :{
            allowNull:false,
            type: dataTypes.INTEGER
        },
        price :{
            allowNull:false,
            type: dataTypes.DECIMAL
        },
        payment :{
            allowNull:false,
            type: dataTypes.INTEGER
        },
        orderId : {
            allowNull:false,
            type: dataTypes.INTEGER
        },
    };
    let config ={
        tableName :"cartItems",
        timeStamps : false,
        underscored : true
    };
    
    const CartItem = sequelize.define(alias, cols, config);
    
    return CartItem;
}