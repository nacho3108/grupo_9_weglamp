const path = require('path')
const productosModel = require('../models/productosModel')
const multer = require('multer');
const bookingControllers = {
 
    productDetail: (req, res) => {
        res.render('booking/productDetail')
    },

    productList: (req, res) => {
        const productos =  productosModel.findAll()
        res.render('booking/productList', {productos})
    },


    productClase: (req, res) => {
        const clases = req.params.clase;
        const clase =  productosModel.findByClass(clases)
        res.render('booking/productList', {clase})
    },

 


    /*productClase :(req,res)=> {
        const clase = req.params.clase
        const detalleClase = productosModel.findByPk(clase)
        res.render('booking/productList',{detalleClase})   
    },

   /*productByclass :(req,res)=>{
        const productos = productosModel.findByPk()
        res.render('booking/productList', {productByclass})
    },   */
    

    new :(req,res)=> {
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

       /* if(typeof file.image !== "undefined"){
            return file.image
        }else{
            return product.image

        }*/

        data.image = image
        productosModel.update(data, id);

        res.redirect('/booking/edit/' + id);
    },



    detalle :(req,res)=> {
        const id = req.params.id
        const detalleProductos = productosModel.findByPk(id)
        res.render('booking/detalle',{detalleProductos})   
    },

    store: (req, res) => {
        const { destination, name, pax, prize} = req.body;
        const { file } = req
        const images = file.filename
        const product = {
            destination: destination,
            name:name,
            pax:pax,
            prize:prize,
            image:'/images/'+ images,
        }


        productosModel.create(product)
        res.redirect('/')
    },
    destroy: (req, res) => {
        const id = req.params.id;
        
       productosModel.destroy(id);

        res.redirect('/booking/productList');
    }

}

module.exports = bookingControllers ;
