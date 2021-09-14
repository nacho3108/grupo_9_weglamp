const express = require("express");
const bookingApiRoutes = express.Router();
const bookingApiController = require("../../controllers/api/bookingApiController");

bookingApiRoutes.get("/", bookingApiController.domeList);
bookingApiRoutes.get("/:id", bookingApiController.domeDetail);

module.exports = bookingApiRoutes;