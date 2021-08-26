const path = require("path");
//const productosModel = require('../models/productosModel')
const multer = require('multer');
const {validationResult} = require("express-validator");
const db = require("../database/models")

const bookingControllers = {
    productDetail: (req, res) => {
        res.render('booking/productDetail');
    },

    cartItem: (req, res) => {
        res.render('booking/cartItem');
    },

    productList: async (req, res) => {
        let domes = await db.Dome.findAll();
        res.render("booking/productList", {productos: domes});
    },
    
    new: (req, res) => {
        res.render('booking/new');
    },

    edit: async (req, res) => {
        let dome = await db.Dome.findByPk(req.params.id);
        res.render("booking/edit", {dome});
    },

    update: async (req, res) => {
        let data = req.body;
        const {id} = req.params;
        const {file} = req;
        const oldDome = await db.Dome.findByPk(id);
        
        if(file){
            data.image = "/images/" + file.filename;
        } else {
            data.image = oldDome.image;
        }

        await db.Dome.update(data, {where: {id: id}});
        res.redirect("/booking/edit/" + id);
    },

    detalle: async (req, res) => {
        const {id} = req.params;
        const dome = await db.Dome.findByPk(id, {include:["destination"]});
        res.render('booking/detalle', {detalleProductos: dome});
    },

    store: async (req, res) => {
        const {destination, name, pax, price} = req.body;
        const {file} = req;
        const image = "/images/" + file.filename;

        newDome = await db.Dome.create({
            name: name,
            destinationId: 1, // Temporal; necesitamos que lo agarre del formulario.
            pax: pax,
            image:image,
            //classId: req.body.classId,
            //ownerId: req.body.ownerId,
            price: price
        });

        res.redirect('/booking/detalle/' + newDome.id);
    },

    destroy: async (req, res) => {
        const {id} = req.params;
        await db.Dome.destroy({where: {id}});
        res.redirect('/booking/productList');
    }
}

module.exports = bookingControllers ;
