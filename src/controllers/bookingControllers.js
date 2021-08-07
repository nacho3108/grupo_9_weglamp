const path = require('path')
const productosModel = require('../models/productosModel')
const multer = require('multer');
const {validationResult } =require("express-validator");
const db = require("../database/models")

const bookingControllers = {
 
    productDetail: (req, res) => {
        res.render('booking/productDetail')
    },

    productList: (req, res) => {
       
        db.Dome.findAll()
       
    
        .then(Domes => {
            res.render('booking/productList', {productos : Domes })
        })
        
    },


    productClase: (req, res) => {
        const clases = req.params.clase;
        const clase =  productosModel.findByClass(clases)
        res.render('booking/productList', {clase})
    },
    

    new :(req,res)=> {
     /*   let Errores = validationResult(req);
        if(!Errores.isEmpty){
            return res.render("formulario ok")
        }else{mensajedeError : error.mapped()}*/
        res.render('booking/new')   
    },

    edit :(req,res)=> {
        const product = productosModel.findByPk(req.params.id);
        res.render('booking/edit', {
            product
        }); 
    },


    update: (req, res) => {
        const data = req.body;
        const { file } = req
       
        const { id } = req.params;
        let  productOriginal = productosModel.findByPk(id)
        let image

        if (file) {
            image = '/images/' + file.filename
        } else {
            image = productOriginal.image
        }

    

        data.image = image
        productosModel.update(data, id);

        res.redirect('/booking/edit/' + id);
    },



    detalle :(req,res)=> {
        const id = req.params.id
        db.Dome.findByPk(id)
            .then(detalleProductos => {
        res.render('booking/detalle',{detalleProductos})
          
    })
},

    store: (req, res) => {
        // Crear el objeto 
        const { destination, name, pax, prize } = req.body;

        // dentro de req.file va a venir la información del archivo
        const { file } = req
        
        // nuestra ruta al archivo
        const image = file.filename

        const product = {
            destination: destination,
            name:name,
            pax:pax,
            prize:prize,
            image: '/images/' + image,
        }

        /*const productCreated = productosModel.create(product);*/
        db.Dome.create({
           
            name:req.body.name ,          
            destinationId:req.body.destinationId,
            pax: req.body.pax,
            image:req.body.image,
            classId:req.body.classId,
            ownerId:req.body.ownerId,
            price:req.body.price
        })
        .then(newProduct => {
             res.redirect('/booking/detalle/' + newProduct.id);
        })
           
        
        
    },

   
    destroy: (req, res) => {
        const id = req.params.id;
        
       productosModel.destroy(id);

        res.redirect('/booking/productList');
    }

}

module.exports = bookingControllers ;
