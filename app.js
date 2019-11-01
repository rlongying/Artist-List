//server
let express = require("express");
let path = require("path");
//middle wares
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express app is listening at http://localhost:${port}`);
});
