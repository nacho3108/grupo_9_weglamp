module.exports = (sequelize, dataTypes) => {
    let alias ="User";
    let cols ={
        id : {
            autoIncrement : true,
            primaryKey : true,
            type: dataTypes.INTEGER
        },
        name :{
            allowNull :false,
            type: dataTypes.STRING
        },
        surname :{
            allowNull :false,
            type: dataTypes.STRING
        },
        email : {
            allowNull :false,
            type: dataTypes.STRING
        },
        password :{
            allowNull :false,
            type: dataTypes.STRING
        },
        avatar:{
            type: dataTypes.STRING
        },
        roleId :{
            allowNull :false,
            type: dataTypes.BOOLEAN
        }
        };
    let config ={
        tableName :"Users",
        timeStamps : false,
        underscored : true
    };
    const User = sequelize.define(alias, cols, config);
    return User;
}