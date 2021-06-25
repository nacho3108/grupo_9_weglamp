const express = require("express");
const aboutRoutes = express.Router();
const aboutController = require("../controllers/aboutController");

aboutRoutes.get("/FAQ", aboutController.FAQ);
aboutRoutes.get("/masinfo", aboutController.masinfo);
aboutRoutes.get("/privacidad", aboutController.privacidad);
aboutRoutes.get("/quees", aboutController.quees);
aboutRoutes.get("/quienessomos", aboutController.quienessomos);
aboutRoutes.get("/seisrazones", aboutController.seisrazones);
aboutRoutes.get("/terminos", aboutController.terminos);
aboutRoutes.get("/tipos", aboutController.tipos);

module.exports = aboutRoutes;