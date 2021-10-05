const Sequelize = require('sequelize');
const db = require('../database/mysql');

var kategori = db.define('kategori',
{
    idKategori: Sequelize.INTEGER,
    nama: Sequelize.STRING,
    gambar: Sequelize.STRING
},{
    freezeTableName: true,
    timestamps:false
});

kategori.removeAttribute('id');
module.exports = kategori;