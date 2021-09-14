const {User} = require("../../database/models");

module.exports = {
    async userList(req, res){
        try{
            const users = await User.findAndCountAll(); // Petición a la base de datos.
            const usersInfo = []; // Array auxiliar.

            // Poblar el array con los datos necesarios de cada usuario.
            users.rows.forEach(user => {
                let info = {
                    id: user.id,
                    name: user.name + " " + user.surname,
                    email: user.email,
                    detail: "http://" + req.headers.host + "/api/users/" + user.id
                }
                usersInfo.push(info);
            });

            // Si todo sale bien, se pasa la información con estado exitoso.
            res.status(200).json({
                meta: {
                    status: "success",
                    count: users.count
                },
                data: {
                    users: usersInfo
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
                    err
                }
            });
        }
    },

    async userDetail(req, res){
        try{
            const user = await User.findByPk(req.params.id);
            
            // Si el usuario no existe, se devuelve un error 404.
            if(!user){
                res.status(404).json({
                    meta: {
                        status: "not_found"
                    }
                });
            }

            const userInfo = {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                image: "http://" + req.headers.host + user.image
            };

            res.status(200).json({
                meta: {
                    status: "success",
                },
                data: userInfo
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