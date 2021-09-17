// Módulos
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const notFound = require ("./middlewares/notFound");
const session = require ("express-session");
const createError = require('http-errors');
const config = require("./config/config")
const cors = require("cors");

// Configuración de Express
const app = express();
app.use(cors()); // Para poder usar las APIs
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("paulisdeadman"));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(session({secret:config.sessionSecret}));
const cookiesSessionMiddleware = require('./middlewares/cookiesSessionMiddleware');
const sessionToLocals = require('./middlewares/sessionToLocals');
app.use(cookiesSessionMiddleware);
app.use(sessionToLocals);

// Módulos de rutas
const mainRoutes = require("./routes/mainRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const usersRoutes = require("./routes/usersRoutes");
const apiRoutes = require("./routes/api")

// Configuración de rutas
app.use("/", mainRoutes);
app.use("/about", aboutRoutes);
app.use("/booking", bookingRoutes);
app.use("/user", usersRoutes);
app.use("/api", apiRoutes);

// Ejecución del servidor de Express con puerto para Heroku
app.listen(process.env.PORT || 3000,function(){
    console.log('Servidor corriendo en el puerto 3000')
});

// Error 404
app.use(notFound);