const path = require('path')
const fs = require('fs')
const registerModel = require('../models/registerModel')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const userControllers = {
    login: (req, res) => {
        res.render('users/login')
    },

    register: (req, res) => {
            res.render('users/register')
     },
    
     store: (req, res) => {
        const formValidation = validationResult(req)
        const oldValues = req.body
        
        if (!formValidation.isEmpty()) {
            // borrar imagen
            if (req.file) {
                // primero chequeamos que exista
                fs.unlinkSync(req.file.path)
            }

            // tenemos errores
            res.render('users/register', { oldValues, errors: formValidation.mapped() })
          return  
        } 

        // Crear el objeto usuario
        const { nombre, apellido, email, contraseña } = req.body;

        // dentro de req.file va a venir la información del archivo
        const { file } = req
        
        // nuestra ruta al archivo
        const image = file.filename

        // hashear el password
        const hashPassword = bcrypt.hashSync(contraseña)

        const user = {
           nombre,
            email,
            contraseña: hashPassword,
            image: '/images/users/' + image,
        }
        
        usersModel.create(user);

        res.redirect('/users/login');
    },






       /* const { nombre, apellido, email, contraseña, image} = req.body;
        const hashPassword = bcrypt.hashSync(contraseña, 10)
        const regist = {
            nombre:nombre,
            apellido:apellido,
            email:email,
            contraseña:hashPassword,
            image: image,
        }
        registerModel.create(regist)
        res.redirect('/')
    },*/

}

module.exports = userControllers;

