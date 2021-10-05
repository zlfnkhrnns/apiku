const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');

const kategoriRoutes = require('./routes/kategori');
const lisRoutes = require('./routes/lis');
const indeksRoutes = require('./routes/indeks');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));  

app.use('/kategori', kategoriRoutes);
app.use('/lis', lisRoutes);
app.use('/indeks', indeksRoutes);

app.use('/assets/gambar', express.static('assets'));
app.use('/assets/rekaman', express.static('assets'));
app.use('/assets/foto', express.static('assets'));

app.use((req, res, next) => {
    const error = new Error('Tidak Ditemukan');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;