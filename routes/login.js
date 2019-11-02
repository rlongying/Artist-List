let express = require("express");
let router = express.Router();

const loginController = require("../controllers/LoginController");

router.post("/login", loginController.login);
router.get("/logout", loginController.logout);

module.exports = router;
