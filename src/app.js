// Módulos
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

// Configuración de Express
const app = express();
app.use(express.static("../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.set("view engine", "ejs")

/* No hacía falta esto porque ahora está en el mismo directorio.
app.set('views','./src/views')*/

/* Esto no debería hacer falta siendo que se puede pasar la ruta relativa.
const publicpath = path.resolve(__dirname, '../public');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(publicpath));*/

// Rutas
const aboutRoutes = require('./routes/aboutRoutes');
const mainRoutes = require('./routes/mainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require ('./routes/usersRoutes');

app.use('/about', aboutRoutes);
app.use('/main', mainRoutes);
app.use('/booking', bookingRoutes);
app.use('/user', userRoutes);

app.get('/', (req,res) => {
    res.render('index', {
        tittle:'productos'
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
});

// Falta crear y agregar el 404 acá.