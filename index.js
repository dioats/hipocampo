require("dotenv").config();
const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();

const connection = require('./db/db.js');

app.use(express.static("public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set('views', path.resolve(__dirname, "./views"));
app.use(express.urlencoded())

app.get('/', function (req, res) {

  const isLogged = false;

  if(isLogged) {
    return res.render("home");
  }
  
  return res.render("main", {css: ["main.css"]});
});

app.get('/register', function (req, res) {
  res.render("register", {css: ["access.css"]});
});

app.post('/register', function (req, res) {
  console.log(req.body)
  res.render("register", {css: ["access.css"]});
});

app.get('/login', function (req, res) {
  res.render("login", {css: ["access.css"]});
});

app.get('/profile', function (req, res) {
  res.render("profile");
});

app.get('/note/new', function (req, res) {
  res.render("note");
});

app.get('/note/:id', function (req, res) {
  res.render("note");
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, () => {
  console.log("listening at " + HOST + ":" + PORT);
});