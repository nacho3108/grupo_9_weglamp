module.exports = (sequelize, dataTypes) => {
    let alias = "Dome";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        pax: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        classId: {
            /*allowNull :false,*/
            type: dataTypes.INTEGER
        },
        destinationId: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        ownerId: {
            /*allowNull :false,*/
            type: dataTypes.INTEGER
        },
        price: {
            allowNull: false,
            type: dataTypes.DECIMAL
        },
        description: {
           /* allowNull :false,*/
           type: dataTypes.TEXT
        },
    };
    let config = {
        tableName: "Domes",
        timestamps: false,
        underscored: true
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