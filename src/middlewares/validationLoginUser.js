const { body } = require('express-validator')
const bcrypt = require('bcryptjs')
const registerModel = require('../models/registerModel')
const db = require("../database/models")

const validationLoginUser = [
    body('email')
        .notEmpty()
        .withMessage('Por favor ingrese su e-mail')
        .bail()
        .isEmail()
        .withMessage('No es en formato e-mail'),
    body('contraseña')
        .notEmpty()
        .withMessage('Por favor ingrese su contraseña')
        .bail()
        .custom((value, { req }) => {
            const { email, contraseña } = req.body
            
            // encontrar un usuario con el email
            const userFound = db.User.findOne({
                where :{
                    email
                }
            })
            .then((userFound)=>{
             // chequear que userFound exista
            if (userFound) {
                // return false
                // comparar contraseñas
                const passwordMatch = bcrypt.compareSync(contraseña, userFound.contraseña)

                if (!passwordMatch) {
                    return Promise.reject('El usuario o la contraseña son inválidas');
                    
                }
                return true
            }else {
                return Promise.reject('El usuario o la contraseña son inválidas');

            }
            });

            
        })
       
]

module.exports = validationLoginUser