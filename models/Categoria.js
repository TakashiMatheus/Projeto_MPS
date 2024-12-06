const Sequelize = require("sequelize")
const db        = require("../db/connection")

const Categoria = db.define('categorias', {
    nome: {
        type: Sequelize.STRING,
    }
});

module.exports = Categoria;