const ARTISTS_KEY = "artists";
const SERVER_ADDRESS = "api";

const refreshArtistList = () => {
  clearArtistList();
  let artistsToDisplay = [];
  fetch(`${SERVER_ADDRESS}/artists`)
    .then(response => response.json())
    .then(artists => {
      if (artists !== null) {
        artistsToDisplay = artists;
      }
      if (artistsToDisplay.length > 0) {
        artistsToDisplay.forEach(artist => {
          const { name, desc, url } = artist;
          displayArtist(name, desc, url);
        });
      }
    })
    .catch(error => console.log("error: " + error));
};

function displayArtist(artist_name, artist_desc, url) {
  var artist_list = document.querySelector(".artist_list");

  var li = document.createElement("div");
  li.setAttribute("class", "artist");

  var img = document.createElement("img");
  img.setAttribute("src", url);
  li.appendChild(img);

  var info_div = document.createElement("div");
  info_div.setAttribute("class", "artist_info");

  var name = document.createElement("h3");
  name.textContent = artist_name;
  name.setAttribute("class", "artist_name");

  var desc = document.createElement("p");
  desc.textContent = artist_desc;
  desc.setAttribute("class", "artist_desc");

  var delete_btn = document.createElement("button");
  delete_btn.setAttribute("class", "delete_artist_btn");
  delete_btn.textContent = "Delete";
  delete_btn.addEventListener("click", () => {
    let name = delete_btn.parentElement.querySelector(".artist_name")
      .textContent;
    delete_btn.parentElement.remove();
    deleteArtist(name);
  });

  info_div.appendChild(name);
  info_div.appendChild(desc);
  li.appendChild(info_div);
  li.appendChild(delete_btn);

  artist_list.appendChild(li);
}

const addArtist = () => {
  var name = document.querySelector("#artist_name");
  var desc = document.querySelector("#artist_desc");
  var url = document.querySelector("#artist_url");

  saveArtist(name.value, desc.value, url.value);

  displayArtist(name.value, desc.value, url.value);

  name.value = "";
  desc.value = "";
  url.value = "";

  document.querySelector(".add_form").classList.add("hide");
};

const saveArtist = (name, desc, url) => {
  //not set
  fetch(`${SERVER_ADDRESS}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      desc,
      url
    })
  }).then(response => console.log(response));
};

const deleteArtist = nameToDelete => {
  fetch(`${SERVER_ADDRESS}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nameToDelete
    })
  }).then(response => console.log(response));
};

const clearArtistList = () => {
  //clear all list under artist ul, if
  const artist_list = document.querySelector(".artist_list");
  while (artist_list.lastChild) {
    artist_list.removeChild(artist_list.lastChild);
  }
};

const searchArtists = async () => {
  let keyword = document
    .querySelector("#search_box")
    .value.trim()
    .toLowerCase();

  if (keyword !== "") {
    let myArtists = await fetch(`${SERVER_ADDRESS}/search/${keyword}`).then(
      response => response.json()
    );

    //clear
    clearArtistList();

    //show filtered artist
    if (myArtists.length > 0) {
      myArtists.forEach(artist => {
        const { name, desc, url } = artist;
        displayArtist(name, desc, url);
      });
    }
  } else {
    refreshArtistList();
  }
};

// bind event listeners
document.querySelector("#add_btn").addEventListener("click", addArtist);

document.querySelector(".add_artist_btn").addEventListener("click", () => {
  document.querySelector(".add_form").classList.toggle("hide");
});

document
  .querySelector(".search_artist_btn")
  .addEventListener("click", searchArtists);

document.querySelector("#search_box").addEventListener("input", searchArtists);

window.onload = refreshArtistList;
