const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express();

// Conexão com banco de dados MySql
const conn = require('./db/conn')

app.use(express.static("public"));
app.set("view engine", "handlebars");

// Template Engine
app.engine("handlebars", handlebars.engine({
  layoutsDir: path.join(__dirname, "views", "layouts")
}))

//Rotas
app.get('/home', function (req, res){
  res.send('home');
});

app.get('/register', function (req, res){
  res.send('register');
});

app.get('/login', function (req, res){
  res.send('login');
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, () => {
  console.log("listening at " + HOST + ":" + PORT);
});