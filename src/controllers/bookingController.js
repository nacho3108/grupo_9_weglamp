const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {validationResult} = require("express-validator");
const db = require("../database/models");

const bookingController = {
    productDetail: async (req, res) => {
        const destinations =  await db.Destination.findAll();
        res.render("booking/productDetail", {destinations});
    },

    cartItem: (req, res) => {
        res.render("booking/cartItem");
    },

    productList: async (req, res) => {
        let domes = await db.Dome.findAll();
        res.render("booking/productList", {productos: domes});
    },

    search: async (req, res) => {
        let domes = await db.Dome.findAll({where: {destinationId: req.query.destino}});
        res.render("booking/productList", {productos: domes});
    },
 
    new: async (req, res) => {
        const destinations =  await db.Destination.findAll();
        res.render("booking/new", {destinations});
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
        res.render("booking/detalle", {detalleProductos: dome});
    },

    store: async (req, res) => {
        const formValidation = validationResult(req)
        /*const newDome = await db.Dome.findAll()*/
        
        if (!formValidation.isEmpty()) {
            // borrar imagen
            if (req.file) {
                // primero chequeamos que exista
                fs.unlinkSync(req.file.path)
            }
             // tenemos errores
             const destinations =  await db.Destination.findAll();
            const oldValues = req.body
            return res.render("booking/new", {oldValues, destinations, errors: formValidation.mapped()})
        } 
        const {destination, name, pax, price, comment} = req.body;
        const {file} = req;
        const image = "/images/" + file.filename;
        

        const newDome =  await db.Dome.create({
            name: name,
            destinationId: destination, 
            pax: pax,
            image: image,
            //classId: req.body.classId,
            //ownerId: req.body.ownerId,
            price: price,
            comment : comment,
        });

        res.redirect("/booking/detalle/" + newDome.id); 
    },
   
    destroy: async (req, res) => {
        const {id} = req.params;
        await db.Dome.destroy({where: {id}});
        res.redirect("/booking/productList");
    }
}

module.exports = bookingController;