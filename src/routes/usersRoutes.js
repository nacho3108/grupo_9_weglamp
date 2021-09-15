const express = require("express");
const usersRoutes = express.Router();
const path = require("path");
const validationRegisterUser = require("../middlewares/validationRegisterUser");
const validationLoginUser = require("../middlewares/validationLoginUser");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Configuración del destino absoluto.
        const destinationPath = path.join(__dirname, '../../public/images/users');
        // Se llama al callback con error (null) y la ruta donde guardar.
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        // Extensión del archivo original.
        const extension = path.extname(file.originalname); // Ej.: ".jpg"
        // Identificador único generado a partir de la fecha.
        const now = Date.now(); // Ej.: "32173821637218631"
        // Se genera el nombre para el archivo.
        const filename = now + extension;
        // Se llama al callback con error (null) y el nombre del archivo.
        cb(null, filename);
    },
});
const upload = multer({storage});
const usersController = require("../controllers/usersController");

usersRoutes.get("/login", guestMiddleware, usersController.login);
usersRoutes.post("/login", guestMiddleware, validationLoginUser, usersController.processLogin);

usersRoutes.get("/register", guestMiddleware, usersController.register);
usersRoutes.post("/register", guestMiddleware, upload.single("image"), validationRegisterUser, usersController.store);

usersRoutes.get("/profile", authMiddleware, usersController.profile);

usersRoutes.get("/logout", authMiddleware, usersController.logout);

module.exports = usersRoutes;