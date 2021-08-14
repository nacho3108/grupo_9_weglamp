module.exports = (sequelize, dataTypes) => {
    let alias ="Destination";
    let cols ={
        id : {
            autoIncrement : true,
            primaryKey : true,
            type: dataTypes.INTEGER
        },
        destinationsName : {
            allowNull :false,
            type: dataTypes.STRING
        }
        };

    let config = {
        tableName :"destinations",
        timestamps : false,
        underscored : true
    };
    const DestinationModel = sequelize.define(alias, cols, config);
    DestinationModel.associate = models => {
        DestinationModel.hasMany(models.Dome, {
            as: "destination",
            foreignKey: "destinationId"
        });
    }

    return DestinationModel;
}