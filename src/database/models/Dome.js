module.exports = (sequelize, dataTypes) => {
    let alias ="Dome";
    let cols ={
        id : {
            autoIncrement : true,
            primaryKey : true,
            type: dataTypes.INTEGER
        },
        name : {
            allowNull :false,
            type: dataTypes.STRING
        },
        destinationId : {
           
                allowNull :false,
                type: dataTypes.BOOLEAN
            
        },
        pax : {
                allowNull :false,
                type: dataTypes.BOOLEAN
        },
        image : {
                 type: dataTypes.STRING
        },
        classId : {
                 allowNull :false,
                type: dataTypes.BOOLEAN
        },
        ownerId : {
                 allowNull :false,
                type: dataTypes.STRING
        },
        price : {
                 allowNull :false,
                type: dataTypes.DECEMAL
        },
        };
    let config ={
        tableName :"Domes",
        timeStamps : false,
        underscored : true
    };
    const Dome = sequelize.define(alias, cols, config);
    return Dome;
}