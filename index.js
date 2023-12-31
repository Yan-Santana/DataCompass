const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

// View Engine
app.set("view engine", "ejs");


// static files
app.use(express.static("public"));


// Body Parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados");
    }).catch((error) => {
        console.log(error);
    });

app.use("/", categoriesController); // Importing the categories 
app.use("/", articlesController); 


app.get("/", (req, res) => {
       Article.findAll({
        order: [
            ['id', 'DESC']
        ]
       }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    })
})


app.get("/:slug/", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {      
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories});
            });
        }else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
})


// Routes
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});