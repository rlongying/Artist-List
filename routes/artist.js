let express = require("express");
let router = express.Router();

const artistController = require("../controllers/ArtistController");

router.post("/add", artistController.addNewArtist);
router.get("/all", artistController.getAllArtists);
router.get("/search", artistController.searchArtists);
router.delete("/delete", artistController.deleteArtist);

module.exports = router;
