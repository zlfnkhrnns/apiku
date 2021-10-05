const Sequelize = require('sequelize');
const db = require('../database/mysql');


var indeks = db.define('indeks',
{
    no: Sequelize.INTEGER,
    idIndeks: Sequelize.INTEGER,
    topik: Sequelize.STRING,
    menit: Sequelize.STRING
},{
    freezeTableName: true,
    timestamps:false
});

indeks.removeAttribute('id');
module.exports = indeks;