// desestructura
const { Sequelize } = require('sequelize');

const db = new Sequelize({
    hots:'localhost',
    database: 'entregable_dos_db',
    port: 5432,
    username: 'postgres',
    password: 'root',
    dialect: 'postgres'
})

module.exports = db;