require("dotenv").config();
const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const session = require('express-session');
const User = require("./models/User.js");
const Lembrete = require("./models/Lembrete.js");

app.use(express.static("public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set('views', path.resolve(__dirname, "./views"));
app.use(express.urlencoded());
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

function isLogged(req) {
  if(process.env.MODE === "dev") {
    req.session.user = {
      email: process.env.DEV_MODE_USER
    }
  }

  return !!req.session.user;
}

function authMiddleware(req, res, next) {

  if (isLogged(req)) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', async function (req, res) {

  if(!isLogged(req)) {
    return res.render("main", {css: ["main.css"]});
  }

  const user = await User.findOne({
    where: {
      email: req.session.user.email,
    }
  });

  const lembretesFromDB = await Lembrete.findAll({
    where: {
      email_usuario: req.session.user.email
    },
    order: [["data_evento", "ASC"]]
  });

  const lembretes = lembretesFromDB.map(ldb => ({...ldb.dataValues}));

  return res.render("home", {
    css: ["home.css"], 
    user: {
      username: user.username
    },
    lembretes
  });
});

app.get('/register', function (req, res) {
  res.render("register", {css: ["access.css"]});
});

app.post('/register', async function (req, res, next) {
  
  try {
    await User.create({
      username: req.body['username'],
      email: req.body['email'],
      password: req.body['password'],
      phoneNumber: req.body['phoneNumber'],
    });

    console.log(`usuario criado: ${req.body['email']}`);

    req.session.user = {
      email: req.body['email']
    }
  
    res.redirect("/");
  } catch(e) {
    if(e.errors && e.errors[0] && e.errors[0].type === "unique violation") {
      res.render("register", {css: ["access.css"], errorMessage: "Email já cadastrado!"});
      return;
    }
    console.log(`erro ao cadastrar usuario: ${req.body['email']}`, JSON.stringify(error))
    next(e);
  }

});

app.get('/login', function (req, res) {
  res.render("login", {css: ["access.css"]});
});

app.post('/login', async function (req, res) {

  const user = await User.findOne({
    where: {
      email: req.body['email'],
    }
  });

  if(!user || user.password != req.body['password']) {
    res.render("login", {css: ["access.css"], errorMessage: "Login inválido!"});
    return;
  }

  req.session.user = {
    email: req.body['email']
  }

  res.redirect("/");
});

app.get('/profile', authMiddleware, async function (req, res) {

  const user = await User.findOne({
    where: {
      email: req.session.user.email,
    }
  });

  res.render("profile", {
    css: ["profile.css"], 
    edited: req.query && req.query.edited,
    user: {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber
    }
  });
});

app.post('/profile', authMiddleware, async function (req, res) {

  const user = await User.findOne({
    where: {
      email: req.session.user.email,
    }
  });

  user.username = req.body["username"];
  user.phoneNumber = req.body["phoneNumber"];

  user.save();

  return res.redirect("/profile?edited=true")
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/")
})

app.get('/reminders/new', authMiddleware, function (req, res) {
  res.render("reminder", {css: ["reminder.css"]});
});

app.post('/reminders', authMiddleware, async function (req, res) {

  if(req.body.id) {
    try {
      const lembrete = await Lembrete.findOne({
        where: {
          email_usuario: req.session.user.email,
          id: req.body.id
        }
      });
  
      lembrete.nome = req.body.title;
      lembrete.descricao = req.body.description;
      lembrete.notificado = false;
      lembrete.data_notificacao = req.body.reminderDate;
      lembrete.data_evento = req.body.eventDate;
  
      await lembrete.save();
  
      res.redirect("/");
    } catch(e) {
      console.log(`erro ao editar lembrete. usuario: ${req.body.email} lembrete ${req.body.id}`, JSON.stringify(error))
      next(e);
    }

    return;
  }

  try {
    await Lembrete.create({
      email_usuario: req.session.user.email,
      nome: req.body.title,
      descricao: req.body.description,
      notificado: false,
      data_notificacao: req.body.reminderDate,
      data_evento: req.body.eventDate
    });
  } catch(e) {
    console.log(`erro ao cadastrar lembrete para usuario: ${req.body.email}`, JSON.stringify(error))
    next(e);
  }

  res.redirect("/");
});

app.delete("/reminders/:id", authMiddleware, async function (req, res) {

  await Lembrete.destroy({
    where: {
      email_usuario: req.session.user.email,
      id: req.params.id
    }
  })

  res.redirect("/");
});

app.get('/reminders/:id', authMiddleware, async function (req, res) {

  const lembrete = await Lembrete.findOne({
    where: {
      email_usuario: req.session.user.email,
      id: req.params.id
    }
  });

  res.render("reminder", {css: ["reminder.css"], values: {...lembrete.dataValues}});
});

app.use(async function(err, req, res, next) {
  res.render("error");
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, () => {
  console.log("listening at " + HOST + ":" + PORT);
});