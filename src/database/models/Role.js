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
        timeStamps : false,
    };
    const Role = sequelize.define(alias, cols, config);
    return Role;
}