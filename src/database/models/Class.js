module.exports = (sequelize, dataTypes) => {
    let alias ="Class";
    let cols ={
        id : {
            autoIncrement : true,
            primaryKey : true,
            type: dataTypes.INTEGER
        },
        name : {
            allowNull :false,
            type: dataTypes.STRING
        }
        };
    let config ={
        tableName :"Classes",
        timeStamps : false,
    };
    const Class = sequelize.define(alias, cols, config);
    return Class;
}