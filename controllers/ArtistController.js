const artistModel = require("../models/artistModel");

const getAllArtists = (req, res, next) => {
  artistModel.getAllArtists().then(([rows, fields]) => {
    console.log("rows :" + rows);
    res.render("artists", { artistsCSS: true, artists: rows });
  });
};

const addNewArtist = (req, res, next) => {
  const { name, about, image } = req.body;

  artistModel
    .addNewArtist({ name, about, image })
    .then(result => {
      console.log("add result: " + JSON.stringify(result));
      res.redirect(301, "/artist/all");
    })
    .catch(err => console.log("adding error: " + err));
};

const searchArtists = (req, res, next) => {
  let key = req.query.key;
  console.log("key to search: " + key);
  if (key && key.trim() != "") {
    artistModel.searchArtistsByKey(key).then(([rows, fields]) => {
      console.log("search results :" + rows);
      res.render("artists", { artistsCSS: true, artists: rows });
    });
  } else {
    res.redirect(301, "/artist/all");
  }
};

const deleteArtist = (req, res, next) => {
  let id = req.body.id;
  artistModel.deleteArtist(id).then(result => {
    console.log("delete result: " + JSON.stringify(result));

    // res.redirect(301, "/artist/all");
    res.status(200).send("delete successfully");
  });
};

module.exports = {
  getAllArtists,
  addNewArtist,
  searchArtists,
  deleteArtist
};
