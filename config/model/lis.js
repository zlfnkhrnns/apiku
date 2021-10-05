const Sequelize = require('sequelize');
const db = require('../database/mysql');

var lis = db.define('lis',
{
    kategoriId: Sequelize.INTEGER,
    indeksId: Sequelize.INTEGER,
    namaNarator: Sequelize.STRING,
    namaInterview: Sequelize.STRING,
    judulSejarah: Sequelize.STRING,
    tempatInterview: Sequelize.STRING,
    tanggalInterview: Sequelize.STRING,
    rekaman: Sequelize.STRING,
    volume: Sequelize.STRING,
    copyright: Sequelize.STRING,
    foto: Sequelize.STRING,
    download: Sequelize.STRING,
    indeks: Sequelize.STRING, 
},{
    freezeTableName: true,
    timestamps:false
});

lis.removeAttribute('id');
module.exports = lis;