const db = require("../../database/models");
const sequelize = require("sequelize");

module.exports = {
    async domeList(req, res){
        try{
            // Peticiones a la base de datos.
            const domes = await db.Dome.findAndCountAll();
            const destinations = await db.Destination.findAndCountAll();
            const domesByDestination = await db.Dome.findAll({
                attributes: ["destinationId", [sequelize.fn("COUNT", "destinationId"), "count"]],
                order: [["destinationId", "ASC"]],
                group: "destinationId"});
            const domesInfo = [];

            // Poblar el array con los datos necesarios de cada usuario.
            domes.rows.forEach(dome => {
                let info = {
                    id: dome.id,
                    name: dome.name,
                    description: dome.description,
                    detail: "http://" + req.headers.host + "/api/booking/" + dome.id
                }
                domesInfo.push(info);
            });

            // Si todo sale bien, se pasa la información con estado exitoso.
            res.status(200).json({
                meta: {
                    status: "success",
                    count: domes.count,
                    countByCategory: domesByDestination,
                    categoryCount: destinations.count
                },
                data: {
                    domes: domesInfo
                }
            });
        } catch(err){
            // Si surge algún error, se pasa el mismo con estado de error.
            res.status(500).json({
                meta: {
                    status: "error"
                },
                error: {
                    msg: "Could not connect to database.",
                    err: err.message ? err.message : err
                }
            });
        }
    },

    async domeDetail(req, res){
        try{
            const dome = await db.Dome.findByPk(req.params.id);
            const destinations = await db.Destination.findAll();
            
            // Si el domo no existe, se devuelve un error 404.
            if(!dome){
                res.status(404).json({
                    meta: {
                        status: "not_found"
                    }
                });
            }

            const domeInfo = {
                id: dome.id,
                name: dome.name,
                destination: {
                    id: dome.destinationId,
                    name: destinations.find(des => des.id == dome.destinationId).destinationsName
                },
                pax: dome.pax,
                price: dome.price,
                image: "http://" + req.headers.host + dome.image
            };

            res.status(200).json({
                meta: {
                    status: "success",
                },
                data: domeInfo
            });
        } catch(err){
            res.status(500).json({
                meta: {
                    status: "error"
                },
                error: {
                    msg: "Could not connect to database",
                    err
                }
            });
        }
    }
}