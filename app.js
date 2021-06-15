const express = require('express');
const path = require('path');
const app = express();
const publicpath = path.resolve(__dirname, './public');

app.use(express.static(publicpath));

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
});

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/productDetail', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'));
});

app.get('/login', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.get('/register', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

app.get('/queEs', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/queEs.html'));
});

app.get('/tipos', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/tipos.html'));
});

app.get('/seisRazones', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/seisRazones.html'));
});

app.get('/masInfo', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/masInfo.html'));
});

app.get('/ayuda', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/ayuda.html'));
});
app.get('/quienesSomos', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/quienesSomos.html'));
});
app.get('/FAQ', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/FAQ.html'));
});
app.get('/terminos', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/terminos.html'));
});
app.get('/privacidad', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/privacidad.html'));
});