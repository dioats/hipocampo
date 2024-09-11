require("dotenv").config();
const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();

const connection = require('./db/db.js');

app.use(express.static("public"));
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine());

app.get('/', function (req, res) {
  res.render("home", {layout: false});
});

app.get('/register', function (req, res){
  res.render("register", {layout: false});
});

app.get('/login', function (req, res){
  res.render("login", {layout: false});
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, () => {
  console.log("listening at " + HOST + ":" + PORT);
});