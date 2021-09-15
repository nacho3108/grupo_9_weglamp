const express = require("express");
const apiRoutes = express.Router();

const usersApiRoutes = require("./usersApiRoutes");
const bookingApiRoutes = require("./bookingApiRoutes");

apiRoutes.use("/users", usersApiRoutes);
apiRoutes.use("/booking", bookingApiRoutes);

module.exports = apiRoutes;