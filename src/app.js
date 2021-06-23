// Módulos
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

// Configuración de Express
const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views','./src/views');

// Módulos de rutas
const mainRoutes = require('./routes/mainRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require ('./routes/usersRoutes');

// Configuración de rutas
app.use('/', mainRoutes);
app.use('/about', aboutRoutes);
app.use('/booking', bookingRoutes);
app.use('/user', userRoutes);

// Ejecución del servidor de Express
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
});

// Falta crear y agregar el 404 acá.