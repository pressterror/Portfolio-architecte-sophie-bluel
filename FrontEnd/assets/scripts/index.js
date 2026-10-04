//////// recuperation DOM
const galerieTraveaux = document.querySelector(".gallery");
const filter = document.querySelector(".filters");
/////////// variable global
let listTraveaux = [];

//////////// creation du portfolio
function afficherTraveaux(liste) {
  galerieTraveaux.innerHTML = "";
  for (const traveaux of liste) {
    const cardTraveaux = document.createElement("figure");
    const traveauxImg = document.createElement("img");
    const traveauxTitle = document.createElement("figcaption");

    traveauxImg.alt = traveaux.title;
    traveauxImg.src = traveaux.imageUrl;
    traveauxTitle.textContent = traveaux.title;

    cardTraveaux.appendChild(traveauxImg);
    cardTraveaux.appendChild(traveauxTitle);
    galerieTraveaux.appendChild(cardTraveaux);
    //sauvegarderTraveaux("", listTraveaux);
  }
}

async function chargerTraveaux() {
  if (localStorage.getItem("traveaux") === null) {
    const dataTraveaux = await fetch("http://localhost:5678/api/works");
    listTraveaux = await dataTraveaux.json();

    localStorage.setItem("traveaux", JSON.stringify(listTraveaux));
  } else {
    listTraveaux = JSON.parse(localStorage.getItem("traveaux"));
  }

  afficherTraveaux(listTraveaux);
}

chargerTraveaux();
///////////// creation filtre Traveaux
async function chargerFiltre() {
  if (sessionStorage.getItem("token")) {
    return;
  }
  let listeBtn;
  const Tous = {
    id: "",
    name: "Tous",
  };
  const bouton = document.createElement("button");
  bouton.textContent = "Tous";
  bouton.classList.add("selected");
  filter.appendChild(bouton);

  if (localStorage.getItem("filtreBouton") === null) {
    const btnGenerer = await fetch("http://localhost:5678/api/categories");
    listeBtn = await btnGenerer.json();
    const filtre = {
      tous: Tous,
      categories: listeBtn,
    };
    localStorage.setItem("filtreBouton", JSON.stringify(filtre));
  } else {
    const filtre = JSON.parse(localStorage.getItem("filtreBouton"));
    listeBtn = filtre.categories;
  }
  for (const categories of listeBtn) {
    const bouton = document.createElement("button");
    bouton.textContent = categories.name;
    bouton.id = categories.id;

    filter.appendChild(bouton);
  }
  restaurerFiltre();
}
chargerFiltre();
/////////// affichage filtrer

filter.addEventListener("click", (event) => {
  const ancienActif = filter.querySelector(".selected");
  const nouvelActif = event.target;

  if (ancienActif === nouvelActif) {
    return;
  }

  ancienActif.classList.remove("selected");
  nouvelActif.classList.add("selected");

  const id = event.target.id;

  localStorage.setItem("filters", id);

  if (id === "") {
    afficherTraveaux(listTraveaux);
  } else {
    const travauxFiltres = listTraveaux.filter(
      (traveaux) => Number(id) === traveaux.categoryId,
    );

    afficherTraveaux(travauxFiltres);
  }
});
//////////// SAUVEGARDE filtre actif
function restaurerFiltre() {
  const filtreSauvegarde = localStorage.getItem("filters");

  if (filtreSauvegarde === null || filtreSauvegarde === "") {
    return;
  }

  const boutonActuel = filter.querySelector(".selected");
  boutonActuel.classList.remove("selected");

  const boutonSauvegarde = filter.querySelector(`[id="${filtreSauvegarde}"]`);

  boutonSauvegarde.classList.add("selected");

  const travauxFiltres = listTraveaux.filter(
    (traveaux) => Number(filtreSauvegarde) === traveaux.categoryId,
  );

  afficherTraveaux(travauxFiltres);
}
