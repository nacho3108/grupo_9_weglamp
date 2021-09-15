module.exports = (req, res, next) => {
    console.log(req.session);

    // Si hay usuario en la sesión, lo pasa a locals para poder usarlo desde los templates.
    if (req.session.logged) {
        res.locals.logged = req.session.logged;
    }

    next();
}