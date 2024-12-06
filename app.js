const express       = require("express");
const exphbs        = require("express-handlebars")
const app           = express()
const path          = require("path")
const db            = require("./db/connection")   
const bodyParser    = require("body-parser")
const {Produto, Categoria} = require("./models/Associacoes");
const { Association } = require("sequelize");

const PORT = 3000;

app.listen(PORT, () =>{
    console.log('O servidou iniciou');
});

// body parser

app.use(bodyParser.urlencoded({extended: false}))

// handle bars

app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

// db connection

db
    .authenticate()
    .then(() => {
        console.log('bando de dados conectado')
    })
    .catch(err => {
        console.log(err)
    })

// routes

app.get('/', (req, res) => {
    res.render('index')
})


app.get('/produtos', (req, res) => {
    Promise.all([
        Produto.findAll({ order: [['createdAt', 'DESC']] }), 
        Categoria.findAll({ order: [['nome', 'ASC']] })     
    ])
    .then(([produtos, categorias]) => {
        const produtosComCategoria = produtos.map(produto => {
            const categoria = categorias.find(cat => cat.id === produto.categoriaID);
            return {
                ...produto.dataValues,
                categoriaNome: categoria ? categoria.nome : 'Sem Categoria' // Retorna apenas o nome
            };
        });

        res.render('produto', {
            produtos: produtosComCategoria,    
            categorias    
        });
        console.log(produtosComCategoria);
        console.log(categorias);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Erro ao carregar produtos e categorias');
    });
});



app.get('/categorias', (req, res) => {
    Categoria.findAll({order: [
        ['createdAt', 'ASC'] 
    ]})
    .then(categorias => {
        res.render('categoria', {
            categorias
        })
    })
})

// cadastro routes

app.use('/cadastro', require("./routes/cadastro"))