//server
let express = require("express");
let path = require("path");
//middle wares
let bodyParser = require("body-parser");
const expressHBS = require("express-handlebars");

let app = express();
const port = process.env.PORT || 3000;

app.engine(
  "hbs",
  expressHBS({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs"
  })
);

app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

let artistRouter = require("./routes/artist");
let loginRouter = require("./routes/login");

app.use("/artist", artistRouter);
app.use(loginRouter);

app.get("/", (req, res) => {
  res.render("login", { loginCSS: true });
});

app.listen(port, () => {
  console.log(`Express app is listening at http://localhost:${port}`);
});
