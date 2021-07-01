const express = require("express");
const userRoutes = express.Router();
const path = require("path");
const validationRegisterUser = require("../middlewares/validationRegisterUser");
const validationLoginUser = require("../middlewares/validationLoginUser");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // guardamos el destino de la carpeta absoluta
        const detinationPath = path.join(__dirname, '../../public/images/users')
        // llamamos al callback con error (null) y el path de donde guardaría el archivo
        cb(null, detinationPath)
    },
    filename: (req, file, cb) => {
        // El nombre del archivo original es: file.originalname
        const extension = path.extname(file.originalname) // .jpg

        // generamos un identificador único a partir de la fecha
        const now = Date.now() // 32173821637218631

        // generar un nombre para nuestro archivo
        //const filename = `${now}${extension}`
        const filename = now + extension
        
        // ejecutamos callback con null (error) y el nombre del archivo
        cb(null, filename)
    },
})
const upload = multer({ storage})
const userControllers = require("../controllers/userControllers");


userRoutes.get("/login", userControllers.login)
userRoutes.post("/login",validationLoginUser, userControllers.processLogin)

userRoutes.get("/register", userControllers.register)
userRoutes.post("/register",upload.single('image'), validationRegisterUser, userControllers.store)

userRoutes.get('/profile',  userControllers.processLogin)


module.exports = userRoutes