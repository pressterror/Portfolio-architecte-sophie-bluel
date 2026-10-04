// base modale
const overlay = document.querySelector(".overlay");
const modale = document.querySelector(".modale");
const modifier = document.querySelector(".portfolio-title p");
const fermerModale = document.querySelector(".fermer-modale");
// elements modale
const titre = document.createElement("h2");
titre.textContent = "Galerie photo";
modale.appendChild(titre);
const galerie = document.createElement("div");
galerie.classList.add("galerie");
modale.appendChild(galerie);
const ajouterPhoto = document.createElement("button");
ajouterPhoto.textContent = "Ajouter une photo";
ajouterPhoto.classList.add("ajouter-photo");
modale.appendChild(ajouterPhoto);

for (const travaux of listTraveaux) {
  const cards = document.createElement("div");
  cards.classList.add("photo");

  const photo = document.createElement("img");
  photo.src = travaux.imageUrl;
  cards.appendChild(photo);

  const icone = document.createElement("button");
  icone.type = "button";
  cards.appendChild(icone);

  const supprimer = document.createElement("img");
  supprimer.src = "./assets/icons/supprimer.svg";
  icone.appendChild(supprimer);

  galerie.appendChild(cards);
}
// ouverture/fermeture modale
modifier.addEventListener("click", () => {
  overlay.classList.remove("cache");
});
fermerModale.addEventListener("click", () => {
  overlay.classList.add("cache");
});
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    overlay.classList.add("cache");
  }
});
