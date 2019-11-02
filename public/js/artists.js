document.querySelector(".add_artist_btn").addEventListener("click", e => {
  e.preventDefault();

  document.querySelector(".add_form").classList.toggle("hide");
});

document.querySelectorAll(".delete_artist_btn").forEach(button => {
  button.addEventListener("click", e => {
    let id = e.target.dataset.id;
    console.log("id to delete: " + id);

    fetch("/artist/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => {
        button.parentElement.remove();
      })
      .catch(err => console.log("delete error: " + err));
  });
});

document.querySelector("#logout").addEventListener("click", () => {
  window.location = "/";
});
