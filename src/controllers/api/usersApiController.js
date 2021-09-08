const {User}= require("../../database/models");

module.exports = {
    async userList(req, res){
        try{
            const users = await User.findAndCountAll();
            const usersInfo = [];

            users.rows.forEach(user => {
                let info = {
                    id: user.id,
                    name: user.name + " " + user.surname,
                    email: user.email,
                    detail: "http://" + req.headers.host + "/api/users/:" + user.id
                }
                usersInfo.push(info);
            })

            res.status(200).json({
                meta: {
                    status: "success",
                    total: users.count
                },
                data: {
                    users: usersInfo
                }
            });
        } catch(err){
            res.status(500).json({
                meta: {
                    status: "error"
                },
                error: {
                    msg: "Cannot connect to database",
                    err
                }
            });
        }
    },

    async userDetail(req, res){
        try{
            const user = await User.findByPk(req.params.id);
            
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
                image: "hola"
            };

            users.rows.forEach(user => {
                let info = {
                    id: user.id,
                    name: user.name + " " + user.surname,
                    email: user.email,
                    detail: "http://" + req.headers.host + "/api/users/:" + user.id
                }
                userInfo.push(info);
            })

            res.status(200).json({
                meta: {
                    status: "success",
                    total: users.count
                },
                data: {
                    users: userInfo
                }
            });
        } catch(err){
            res.status(500).json({
                meta: {
                    status: "error"
                },
                error: {
                    msg: "Cannot connect to database",
                    err
                }
            });
        }
    }
}