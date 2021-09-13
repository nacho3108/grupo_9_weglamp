const { body } = require('express-validator');
const db = require("../database/models");


const validationRegisterUser = [
    body('nombre')
        .notEmpty()
        .withMessage('Por favor ingrese su nombre')
        .isLength({ min: 2, max:15 })
        .withMessage('Por favor ingrese mas de 2 caracteres'),
    body('apellido')
        .notEmpty()
        .withMessage('Por favor ingrese su apellido')
        .isLength({ min: 2, max:15 })
        .withMessage('Por favor ingrese mas de 2 caracteres'),
    body('email')
        .notEmpty()
        .withMessage('Por favor ingrese su e-mail')
        .isEmail()
        .withMessage('No es en formato e-mail')
        .bail()
        .custom(async (email) => {
            const userFound = await db.User.findOne({
                where: { email }
            });
            if (userFound) {
                return Promise.reject('El usuario o la contraseña son inválidas');
            }
            return true;
        }),
    body('password')
        .notEmpty()
        .withMessage('Por favor ingrese su contraseña')
        .isLength({ min: 8, max:25 })
        .withMessage('Por favor ingrese mas de 8 caracteres')
        .matches('[0-9]').withMessage('La contraseña debe contener como minimo un numero')
        .matches('[A-Z]').withMessage('La contraseña debe contener como minimo una mayuscula'),
        /*.matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/
          ).withMessage('La contraseña debe contener como minimo un simbolo'),*/
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