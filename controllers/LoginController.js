const userModel = require("../models/userModel");

const login = (req, res, next) => {
  let user = userModel.getUser();
  let pwd = userModel.getPwd();

  let { username, password } = req.body;
  username = username.trim().toUpperCase();

  console.log(`form: ${username} - ${password}`);
  console.log(`model: ${user} - ${pwd}`);

  if (username === user && password === pwd) {
    res.redirect(301, "/artist/all");
  } else {
    res.render("login", { loginCSS: true, error: true });
  }
};

const logout = (req, res, next) => {
  res.redirect("/");
};

module.exports = {
  login,
  logout
};
