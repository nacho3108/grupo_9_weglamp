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
        timestamps : false,
    };
    const ClassModel = sequelize.define(alias, cols, config);
    return ClassModel;
}