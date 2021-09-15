const express = require("express");
const usersApiRoutes = express.Router();
const usersApiController = require("../../controllers/api/usersApiController");

usersApiRoutes.get("/", usersApiController.userList);
usersApiRoutes.get("/:id", usersApiController.userDetail);

module.exports = usersApiRoutes;