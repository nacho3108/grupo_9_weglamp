const express = require("express");
const bookingRoutes = express.Router();
const path = require("path");
const validationNewDome = require('../middlewares/validationNewDome');
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Configuración del destino absoluto.
        const destinationPath = path.join(__dirname, '../../public/images');
        // Se llama al callback con error (null) y la ruta donde guardar.
        cb(null, destinationPath)
    },
    filename: (req, file, cb) => {
        // Extensión del archivo original.
        const extension = path.extname(file.originalname); // Ej.: ".jpg"
        // Identificador único generado a partir de la fecha.
        const now = Date.now(); // Ej.: "32173821637218631"
        // Se genera el nombre para el archivo.
        const filename = now + extension;
        // Se llama al callback con error (null) y el nombre del archivo.
        cb(null, filename)
    },
});
const upload = multer({storage});
const bookingController = require('../controllers/bookingController');

bookingRoutes.get("/productDetail/:id?", bookingController.productDetail);
bookingRoutes.get("/cartItem/", bookingController.cartItem);
bookingRoutes.get("/productList/", bookingController.productList);
bookingRoutes.get("/productSearch/", bookingController.search);

bookingRoutes.get("/new",validationNewDome, bookingController.new);
bookingRoutes.post("/new", upload.single("image"), validationNewDome, bookingController.store);

bookingRoutes.get("/edit/:id", bookingController.edit);
bookingRoutes.put("/edit/:id", upload.single("image"), bookingController.update);

bookingRoutes.get("/detalle/:id?", bookingController.detalle);

bookingRoutes.delete("/detalle/:id", bookingController.destroy);

module.exports = bookingRoutes;