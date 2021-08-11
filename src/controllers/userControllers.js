const path = require('path')
const fs = require('fs')
const registerModel = require('../models/registerModel')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { maxAgeUserCookie } = require('../config/config')
const {User}= require("../database/models")

const userControllers = {
    login: (req, res) => {
        res.render('users/login')
    },
    processLogin: (req, res) => {
        const formValidation = validationResult(req);

        const oldValues = req.body;
        console.log(oldValues);

        if (!formValidation.isEmpty()) {
            return res.render('users/login', { oldValues, errors: formValidation.mapped() })
        } 
        // lo que viene del login
        const { email, remember} = req.body
            
        // le pedimos al modelo el usuario
        User.findOne({
            where :{
                email
            }
        })
        .then((user)=>{
        // le sacamos el password
         delete user.password

         // cargamos dentro de la sesión la propieda logged con el usuario (menos el password)
         req.session.logged = user

         // guardamos un dato de nuestro usuario en la sesión (email, user_id)
        if (remember) {
                    // clave
         res.cookie('user', user.id, {
             maxAge: maxAgeUserCookie,
            // pasamos esta propiedad para que firme la cookie
            signed: true,    
                    })
                }

                res.redirect('/user/profile')
        })
        
      
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
        const { nombre, apellido, email, password } = req.body;
        console.log(req.body)

        // dentro de req.file va a venir la información del archivo
        const { file } = req
        
        // nuestra ruta al archivo
        const image = file.filename

        // hashear el password
        const hashPassword = bcrypt.hashSync(password)

        const user = {
            nombre:nombre,
            apellido:apellido,
            email:email,
            password: hashPassword,
            image: '/images/users/' + image,
        }
        
        User.create(user)
        .then(()=>{
         res.redirect('/user/login');   
        })

        
    },

    
    profile: (req, res) => {
        res.render('users/profile')
    },

    logout: (req, res) => {
        // borrar session y cookie
        req.session.destroy()
        res.clearCookie('user')
        
        res.redirect('/')
    },
}

module.exports = userControllers;