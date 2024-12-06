const Produto = require("./Produto")
const Categoria = require("./Categoria")

Produto.belongsTo(Categoria, { foreignKey: "categoriaId", as: "categoria" });
Categoria.hasMany(Produto, { foreignKey: "categoriaId"});

module.exports = { Produto, Categoria };