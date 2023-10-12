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

// Routes
app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});