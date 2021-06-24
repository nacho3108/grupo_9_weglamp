const express = require("express");
const mainRoutes = express.Router();
const mainController = require("../controllers/mainController");

mainRoutes.get("/", mainController.index);
mainRoutes.get("/ayuda", mainController.ayuda);

module.exports = mainRoutes;