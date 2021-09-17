const path = require("path");
const fs = require("fs");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const {maxAgeUserCookie} = require("../config/config");
const db = require("../database/models");

const usersController = {
    login: (req, res) => {
        res.render("users/login");
    },

    processLogin: async (req, res) => {
        const formValidation = validationResult(req);
        const oldValues = req.body;
        // En caso de no pasar las validaciones de back-end:
        if (!formValidation.isEmpty()) {
            // Recargar vista pasando valores anteriores y errores.
            return res.render("users/login", {oldValues, errors: formValidation.mapped()});
        }

        const {email, remember} = req.body;
        // Almacena en la sesión el ID del usuario.
        let user = await db.User.findOne({where: {email}, attributes: ["id", "email", "image"]});
        req.session.logged = user;
        // Si está activada la opción de recordar, genera la cookie.
        if(remember){
            res.cookie("user", user, {maxAge: maxAgeUserCookie, signed: true});
        }

        res.redirect("/user/profile");
    },

    register: (req, res) => {
        res.render("users/register");
    },
    
    store: async (req, res) => {
        const formValidation = validationResult(req);
        const oldValues = req.body;
        // En caso de no pasar las validaciones de back-end:
        if (!formValidation.isEmpty()) {
            // Borrar la imagen, si existe.
            if (req.file) {fs.unlinkSync(req.file.path)}
            // Recargar vista pasando valores anteriores y errores.
            return res.render("users/register", {oldValues, errors: formValidation.mapped()});
        }

        const {nombre, apellido, email, password} = req.body;
        const {file} = req; // Archivo de imagen.
        const image = file.filename; // Nombre del archivo.
        const hashPassword = bcrypt.hashSync(password); // Contraseña hasheada.
        try{
            // Creación del objeto usuario.
            const newUser = await db.User.create({
                name: nombre,
                surname: apellido,
                email: email,
                password: hashPassword,
                image: "/images/users/" + image
            });
        }
        catch(err){
            console.log(err);
        }

        res.redirect("/user/login");
    },

    profile: (req, res) => {
        res.render("users/profile");
    },

    logout: (req, res) => {
        // Borrar sesión y cookie.
        req.session.destroy();
        res.clearCookie("user");
        
        res.redirect("/");
    },
}

module.exports = usersController;