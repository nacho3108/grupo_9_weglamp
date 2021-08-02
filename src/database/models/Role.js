module.exports = (sequelize, dataTypes) => {
    let alias ="Role";
    let cols ={
        id : {
            autoIncrement : true,
            primaryKey : true,
            type: dataTypes.INTEGER
        },
        name :{
            allowNull :false,
            type: dataTypes.STRING
        }
        };
    let config ={
        tableName :"Roles",
        timestamps : false,
    };
    const RoleModel = sequelize.define(alias, cols, config);
    return RoleModel;
}