const Sequelize = require("sequelize")
const db        = require("../db/connection")

const Produto = db.define('produtos', {

    nome: {
        type: Sequelize.STRING,
    },

    estoque_minimo: {
        type: Sequelize.INTEGER,
    },

    valor: {
        type: Sequelize.FLOAT,
    },

    categoriaID: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Produto;