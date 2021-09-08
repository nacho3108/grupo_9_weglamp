const express = require("express");
const bookingRoutes = express.Router();
const path = require("path");
const multer = require("multer");

// destino donde guardar el archivo
// nombre del archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // guardamos el destino de la carpeta absoluta
        const detinationPath = path.join(__dirname, '../../public/images')
        // llamamos al callback con error (null) y el path de donde guardaría el archivo
        cb(null, detinationPath)
    },
    filename: (req, file, cb) => {
        console.log('file', file)
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

const upload = multer({ storage })


const bookingController = require('../controllers/bookingController');
const validationNewDome = require('../middlewares/validationNewDome');

bookingRoutes.get('/productDetail/:id?', bookingController.productDetail);
bookingRoutes.get('/cartItem/', bookingController.cartItem);
bookingRoutes.get('/productList/', bookingController.productList);
bookingRoutes.get('/productSearch/', bookingController.search);

// Create
bookingRoutes.get('/new',validationNewDome, bookingController.new);

// aca deberíamos pasar multer
bookingRoutes.post('/new', upload.single('image'),validationNewDome, bookingController.store);

bookingRoutes.get('/edit/:id', bookingController.edit);
bookingRoutes.put('/edit/:id', upload.single('image'), bookingController.update);

bookingRoutes.get('/detalle/:id?', bookingController.detalle);
bookingRoutes.delete('/detalle/:id', bookingController.destroy);

module.exports = bookingRoutes;