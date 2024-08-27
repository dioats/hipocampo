const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.set("view engine", "handlebars");

app.engine("handlebars", handlebars.engine({
  layoutsDir: path.join(__dirname, "views", "layouts")
}))

app.get("/", (req, res) => {
  res.render("home", {layout: "index"})
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, () => {
  console.log("listening at " + HOST + ":" + PORT);
});