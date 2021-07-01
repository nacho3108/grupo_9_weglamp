const { body } = require('express-validator')
const userModel = require('../models/registerModel')


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
            const userFound = registerModel.findByField('email', email)

            if (userFound) {
                return false
            }

            return true
        })
        .withMessage('El usuario ya existe'),
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
]

module.exports = validationRegisterUser