const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize('tfg_plena_inclusion',
    process.env.DATABASEUSER,
    process.env.DATABASEPASS, {
    host: process.env.DATABASEIP,
    dialect: 'mysql'
});

module.exports = sequelize;