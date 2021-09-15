module.exports = (sequelize, dataTypes) => {
    let alias ="User";
    let cols ={
        id : {
            autoIncrement : true,
            primaryKey : true,
            type: dataTypes.INTEGER
        },
        name :{
            /*allowNull :false,*/
            type: dataTypes.STRING
        },
        surname :{
           /* allowNull :false,*/
            type: dataTypes.STRING
        },
        email : {
            allowNull :false,
            type: dataTypes.STRING
        },
        password :{
           /* allowNull :false,*/
            type: dataTypes.STRING
        },
        image:{
            type: dataTypes.STRING
        },
        roleId :{
           /* allowNull :false,*/
            type: dataTypes.INTEGER
        }
        };
    let config ={
        tableName :"Users",
        timestamps : false,
        underscored : true
    };
    const UserModel = sequelize.define(alias, cols, config);
    return UserModel;
}