const path = require('path')
const registerModel = require('../models/registerModel')
const bcrypt = require('bcryptjs')

const userControllers = {
    login: (req, res) => {
        res.render('users/login')
    },

    register: (req, res) => {
            res.render('users/register')
     },
    
     store: (req, res) => {
        const { nombre, apellido, email, contraseña, image} = req.body;
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
    },
}

module.exports = userControllers;

