const{body}=require("express-validator")
const validationNewDome = [
    body("destination").notEmpty(),
    body("name").notEmpty(),
    body("pax").notEmpty(),
    body("prize").notEmpty().withMessage('Por favor ingrese un precio').bail().isNumeric().withMessage('por favor ingrese un valor numerico'),
    body("image").custom((value, {req})=>{
        const {file} = req
        if(!file){
           throw new error() 
        }
        
        return true
    }).withMessage("Seleccione un archivo")
]
module.exports = validationNewDome
