const{body}=require("express-validator")
const productosModel = require("../models/productosModel")
const db = require("../database/models");

const validationNewDome = [
    body("destination").notEmpty().withMessage('Por favor ingrese un destino'),
    body("name").notEmpty().isLength({ min: 5, max:15 })
    .withMessage('Por favor ingrese un nombre'),
    body("pax").notEmpty().withMessage('Por favor ingrese la cantidad de pax'),
    body("price").notEmpty().withMessage('Por favor ingrese un precio').bail().isNumeric().withMessage('por favor ingrese un valor numerico'),
    body("comment").notEmpty().withMessage('Por favor ingrese una descripcion').isLength({ min: 20 }).withMessage('Por favor ingrese una descripcion mayor a 20 caracteres'),
    body("image").custom((value, {req})=>{
        const {file} = req
        if(!file){
           throw new Error("por favor ingrese una imagen") 
        }
        
        return true
    })
    .custom((value, {req}) => {
    
        if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png"){
            return true;
        } else {
            throw new Error("Por favor ingrese un archivo de formato JPG o PNG.");
        }
    })
]
module.exports = validationNewDome
