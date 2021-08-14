const path = require('path')
const productosModel = require('../models/productosModel')
const multer = require('multer');
const {validationResult } =require("express-validator");
const db = require("../database/models")

const bookingControllers = {
 
    productDetail: (req, res) => {
        res.render('booking/productDetail')
    },
    cartItem: (req, res) => {
        res.render('booking/cartItem')
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
        db.Dome.findByPk(req.params.id)
        .then(dome =>{
          res.render('booking/edit', {
            dome 
        });
        
        })
    },


    update:(req, res) => {
        const data = req.body;
       
       
        const { id } = req.params;
        db.Dome.findByPk(id)
        .then(productOriginal => {
             const { file } = req
        let image

        if (file) {
            image = '/images/' + file.filename
        } else {
            image = productOriginal.image
        }

    

        data.image = image
       db.Dome.update(data,{ 
           where :{
               id:id
           }
       });
        /* falta in then aca?*/
        res.redirect('/booking/edit/' + id);
    })
        
    },



    detalle :(req,res)=> {
        const id = req.params.id
        db.Dome.findByPk(id, {include:["destination"]})
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
        
       db.Dome.destroy({
           where: {id}
    })
    .then(()=>{
      res.redirect('/booking/productList');  
    })

        
    }

}

module.exports = bookingControllers ;
