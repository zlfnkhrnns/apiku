var Sequelize = require('sequelize');
var db = new Sequelize('arsipsej_db', 'root', '', {
    dialect:'mysql',
    host:'localhost'
});

module.exports = db;