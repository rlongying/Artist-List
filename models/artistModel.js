let db = require("../util/db");

const getAllArtists = callback => {
  return db.query("SELECT * FROM artists");
};

const searchArtistsByKey = key => {
  return db
    .query("select * from artists where name like ?", `%${key}%`)
    .catch(err => console.log("search error: " + err));
};

const addNewArtist = artist => {
  const { name, about, image } = artist;

  return db.query("insert into artists(name, about, image)values(?, ?, ?)", [
    name,
    about,
    image
  ]);
};

const deleteArtist = id => {
  return db
    .query("delete from artists where id = ?", id)
    .catch(err => console.log("deleting error" + err));
};

module.exports = {
  getAllArtists,
  searchArtistsByKey,
  addNewArtist,
  deleteArtist
};
