module.exports = (sequelize, dataTypes) => {
    let alias ="Destination";
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

    let config = {
        tableName :"Destinations",
        timeStamps : false,
    };
    const Destination = sequelize.define(alias, cols, config);
    return Destination;
}