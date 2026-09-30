//////// recuperation DOM
const galerieTraveaux = document.querySelector(".gallery");
const filter = document.querySelector(".filters");
/////////// variable global
let listTraveaux = [];

//////////// creation du portfolio

async function chargerTraveaux() {
  const dataTraveaux = await fetch("http://localhost:5678/api/works");
  listTraveaux = await dataTraveaux.json();
  for (const traveaux of listTraveaux) {
    const cardTraveaux = document.createElement("figure");
    const traveauxImg = document.createElement("img");
    const traveauxTitle = document.createElement("figcaption");
    traveauxImg.alt = traveaux.title;
    traveauxImg.src = traveaux.imageUrl;
    traveauxTitle.textContent = traveaux.title;
    cardTraveaux.appendChild(traveauxImg);
    cardTraveaux.appendChild(traveauxTitle);
    galerieTraveaux.appendChild(cardTraveaux);
  }
}
chargerTraveaux();
///////////// creation filtre Traveaux
async function chargerFiltre() {
  const bouton = document.createElement("button");
  bouton.textContent = "Tous";
  filter.appendChild(bouton);
  const btnGenerer = await fetch("http://localhost:5678/api/categories");
  const listeBtn = await btnGenerer.json();
  for (const categories of listeBtn) {
    const bouton = document.createElement("button");
    bouton.textContent = categories.name;
    filter.appendChild(bouton);
  }
}
chargerFiltre();
/////////// affichage filtrer

filter.addEventListener("click", (event) => {
  console.log("j'ai cliqué sur", event.target.textContent);
});
