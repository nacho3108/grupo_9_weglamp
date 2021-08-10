const { body } = require('express-validator');
const registerModel = require('../models/registerModel');
const db = require("../database/models");

const validationRegisterUser = [
    body('nombre')
        .notEmpty()
        .withMessage('Por favor ingrese su nombre'),
    body('apellido')
        .notEmpty()
        .withMessage('Por favor ingrese su apellido'),
    body('email')
        .notEmpty()
        .withMessage('Por favor ingrese su e-mail')
        .isEmail()
        .withMessage('No es en formato e-mail')
        .bail()
        .custom((email) => {
            const userFound = db.User.findOne({
                where :{email}
            })
        .then((userFound)=>{
                 if (userFound) {
                    return Promise.reject('El usuario o la contraseña son inválidas');
            }
            return true
            })
        }),
        
    body('contraseña')
        .notEmpty()
        .withMessage('Por favor ingrese su contraseña'),
    body('image')
        .custom((value, { req }) => {
            const { file } = req

            // chequea que haya cargado imagen
            if (!file) {
                // esto es como si hicieramos .withMessage('Seleccione un archivo')
                throw new Error('Por favor ingrese una imagen')
            }

            return true
        })
        .custom((value, {req}) => {
            // Revisa el mimetype del archivo en lugar de sólo la extensión. Es más seguro porque previene que se cargue un archivo de otra extensión con el nombre alterado.
            // Más info acá: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
            if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png"){
                return true;
            } else {
                throw new Error("Por favor ingrese un archivo de formato JPG o PNG.");
            }
        })
];

module.exports = validationRegisterUser;