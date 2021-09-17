const db = require("../database/models");

module.exports = async (req, res, next) => {
    const userCookie = req.signedCookies.user;
    
    // Si existe el cookie de usuario, revisa si es válido y lo pasa a sesión.
    if (userCookie) {
        const user = await db.User.findByPk(userCookie.id, {attributes: ["id", "email", "image"]});
        if(user){
            req.session.logged = user;
        }
    }

    next();
}