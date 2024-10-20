require("dotenv").config();
const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();

const connection = require('./db/db.js');
const User = require("./models/User.js");

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

app.post('/register', async function (req, res, next) {
  
  try {

    const newUser = await User.create({
      username: req.body['username'],
      email: req.body['email'],
      password: req.body['password'],
      phoneNumber: req.body['phoneNumber'],
    });
  
    res.render("register", {css: ["access.css"]});
  } catch(e) {
    next(e);
  }

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

app.use(async function(err, req, res, next) {
  res.render("error");
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, () => {
  console.log("listening at " + HOST + ":" + PORT);
});