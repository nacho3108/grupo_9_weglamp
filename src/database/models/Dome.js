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
                type: dataTypes.STRING
            
        },
        pax : {
                allowNull :false,
                type: dataTypes.BOOLEAN
        },
        image : {
                 type: dataTypes.STRING
        },
        classId : {
                 /*allowNull :false,*/
                type: dataTypes.BOOLEAN
        },
        ownerId : {
                 /*allowNull :false,*/
                type: dataTypes.STRING
        },
        price : {
                allowNull :false,
                type: dataTypes.INTEGER
        },
        };
    let config ={
        tableName :"Domes",
        timestamps : false,
        underscored : true
    };
    const DomeModel = sequelize.define(alias, cols, config);
    DomeModel.associate = models => {
        DomeModel.belongsTo(models.Destination, {
            as: "destination",
            foreignKey: "destinationId"
        });
    }

    return DomeModel;
}