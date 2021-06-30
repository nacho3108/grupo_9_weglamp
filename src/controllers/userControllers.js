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
        console.log(req.body)

        // dentro de req.file va a venir la información del archivo
        const { file } = req
        
        // nuestra ruta al archivo
        const image = file.filename

        // hashear el password
        const hashPassword = bcrypt.hashSync(contraseña)

        const user = {
            nombre:nombre,
            apellido:apellido,
            email:email,
            contraseña: hashPassword,
            image: '/images/users/' + image,
        }
        
        registerModel.create(user);

        res.redirect('/user/login');
    },







}

module.exports = userControllers;

