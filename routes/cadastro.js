const express                = require("express")
const router                 = express.Router()
const { Produto, Categoria } = require("../models/Associacoes")


// teste de rota
router.post('/teste', (req, res) => {
    console.log("A rota está funcionando")
})


// cadastro Categoria 

router.get('/categoria', (req,res) => {

    Categoria.findAll({
        order: [['createdAt', 'ASC']],
    })
    .then(categorias => {
        res.render('addCategoria', {categorias})
    })
})

router.post('/categoria', (req, res) => {
    let {nome} = req.body;

    // insert 
    Categoria.create({
        nome
    })
    .then(() => res.redirect('/categorias'))
    .catch((err) => console.log(err))
 
});

//cadastro de produto

router.get('/produto', (req,res) => {

    Categoria.findAll({
        order: [['createdAt', 'ASC']],
    })
    .then(categorias => {
            res.render('addProduto', {
                categorias
            });
        })
    })

router.post('/produto', (req, res) =>{
    console.log(req.body)
    let {nome, estoque_minimo, valor} = req.body
    const categoriaID = parseInt(req.body.categoria, 10);
    try{
        Produto.create({
            nome,
            estoque_minimo,
            valor,
            categoriaID
        })
        .then(() => res.redirect('/produtos'))
        .catch((err) => console.log(err))
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router