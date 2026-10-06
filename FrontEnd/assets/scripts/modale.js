/**************** MODALE 1 *****************/
// base modale
const overlay = document.querySelector(".overlay");
const modale = document.querySelector(".modale");
const modifier = document.querySelector(".portfolio-title p");
const galeriePrincipale = document.querySelector(".portfolio .gallery");
// generer la modale
function afficherModale() {
  const croix = document.createElement("button");
  croix.type = "button";
  croix.classList.add("fermer-modale");
  modale.appendChild(croix);
  const croixImage = document.createElement("img");
  croixImage.src = "assets/icons/X.svg";
  croixImage.alt = "fermer";
  croix.appendChild(croixImage);
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
  ajouterPhoto.addEventListener("click", () => {
    //passage modale2 (form ajout photo)
    modale.innerHTML = "";
    modale.classList.remove("modale");
    modale.classList.add("modale2");
    affichermodale2();
  });

  for (const travaux of listTraveaux) {
    //generation gallerie des traveaux disponible
    //generation galerie photro
    const cards = document.createElement("div");
    cards.classList.add("photo");

    const photo = document.createElement("img");
    photo.src = travaux.imageUrl;
    cards.appendChild(photo);

    const icone = document.createElement("button");
    icone.type = "button";
    cards.appendChild(icone);
    // suppression depuis la gallerie modale
    icone.addEventListener("click", async () => {
      // suppression traveaux
      const reponse = await fetch(
        `http://localhost:5678/api/works/${travaux.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (reponse.ok) {
        listTraveaux = listTraveaux.filter(
          //supression depuis l'index
          (element) => element.id !== travaux.id,
        );
        cards.remove(); // suppression de la gallery modale
        afficherTraveaux(listTraveaux); // rechargement traveaux index
      }
    });
    const supprimer = document.createElement("img");
    supprimer.src = "./assets/icons/supprimer.svg";
    icone.appendChild(supprimer);

    galerie.appendChild(cards);
  }
  // fermeture de la modale
  croix.addEventListener("click", () => {
    modale.innerHTML = "";
    overlay.classList.add("cache");
  });
}
// ouverture/fermeture  de modale
modifier.addEventListener("click", () => {
  overlay.classList.remove("cache");
  afficherModale();
});
// clic a l'exterieur de la modale
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    modale.innerHTML = "";
    overlay.classList.add("cache");
  }
});
/***************** MODALE 2 ******************/
async function affichermodale2() {
  // recuperation des categorie depuis l'api
  const reponseCategories = await fetch("http://localhost:5678/api/categories");
  const listCategories = await reponseCategories.json();
  //
  const retour = document.createElement("button"); //bouton
  retour.type = "button";
  retour.classList.add("retour-modale");
  modale.appendChild(retour);
  const retourImage = document.createElement("img");
  retourImage.src = "assets/icons/retour.svg";
  retourImage.alt = "retour";
  retour.appendChild(retourImage);
  const croix = document.createElement("button");
  croix.type = "button";
  croix.classList.add("fermer-modale");
  modale.appendChild(croix);
  const croixImage = document.createElement("img");
  croixImage.src = "assets/icons/X.svg";
  croixImage.alt = "fermer";
  croix.appendChild(croixImage); //
  croix.addEventListener("click", () => {
    // fermeture modale
    modale.innerHTML = "";
    overlay.classList.add("cache");
    modale.classList.remove("modale2");
    modale.classList.add("modale");
  });
  const titre2 = document.createElement("h2"); //titre
  titre2.textContent = "Ajout photo";
  modale.appendChild(titre2);
  const ajoutForm = document.createElement("form"); //formulaire debut
  ajoutForm.classList.add("ajout-form");
  modale.appendChild(ajoutForm);
  //creation de la zone import image
  const zoneImage = document.createElement("div");
  zoneImage.classList.add("zone-image");
  ajoutForm.appendChild(zoneImage);
  const ajoutPhoto = document.createElement("input");
  ajoutForm.noValidate = true;
  ajoutPhoto.type = "file";
  ajoutPhoto.name = "photo";
  ajoutPhoto.id = "photo";
  zoneImage.appendChild(ajoutPhoto);
  const iconePhoto = document.createElement("img");
  iconePhoto.src = "./assets/icons/form_img.svg";
  iconePhoto.alt = "";
  zoneImage.appendChild(iconePhoto);
  const ajoutBtn = document.createElement("button");
  ajoutBtn.textContent = " + Ajouter photo";
  ajoutBtn.type = "button";
  zoneImage.appendChild(ajoutBtn);
  //
  // importer une image
  ajoutBtn.addEventListener("click", () => {
    ajoutPhoto.click();
  });
  ajoutPhoto.addEventListener("change", () => {
    const fichier = ajoutPhoto.files[0];
    const tailleMax = 4 * 1024 * 1024;
    if (fichier.type !== "image/jpeg" && fichier.type !== "image/png") {
      // verification du format
      const erreur = document.createElement("p");
      erreur.textContent = "Format d'image non valide";
      erreur.style.color = "red";
      zoneImage.appendChild(erreur);
    } else if (fichier.size > tailleMax) {
      // virification de la taille
      const erreur = document.createElement("p");
      erreur.textContent = "Le fichier est trop volumineux";
      erreur.style.color = "red";
      zoneImage.appendChild(erreur);
    } else {
      //affichage previsualiation
      const preview = document.createElement("img");
      preview.classList.add("preview");
      preview.src = URL.createObjectURL(fichier);
      preview.src = URL.createObjectURL(fichier);

      iconePhoto.remove();
      ajoutBtn.remove();
      infoPhoto.remove();

      zoneImage.appendChild(preview);
    }
  });
  const infoPhoto = document.createElement("p");
  infoPhoto.textContent = "jpg, png: 4mo max";
  zoneImage.appendChild(infoPhoto);
  const titrephoto = document.createElement("label");
  titrephoto.textContent = "Titre";
  ajoutForm.appendChild(titrephoto);
  const titreInput = document.createElement("input");
  titreInput.required = true;
  titreInput.name = "titre";
  titreInput.type = "text";
  titreInput.id = "titre";
  ajoutForm.appendChild(titreInput);
  const categoriePhoto = document.createElement("label");
  categoriePhoto.textContent = "Catégorie";
  ajoutForm.appendChild(categoriePhoto);
  const categorieSelect = document.createElement("select");
  categorieSelect.required = true;
  categorieSelect.name = "category";
  categorieSelect.id = "category";
  ajoutForm.appendChild(categorieSelect);
  console.log(listCategories);
  const optionDefaut = document.createElement("option");

  optionDefaut.value = "";
  optionDefaut.disabled = true;
  optionDefaut.selected = true;
  categorieSelect.appendChild(optionDefaut);
  // creation des categorie depuis la recuperation api
  for (const categorie of listCategories) {
    const option = document.createElement("option");
    option.value = categorie.id;
    option.textContent = categorie.name;
    categorieSelect.appendChild(option);
  }

  const separation = document.createElement("div");
  separation.classList.add("separation");
  ajoutForm.appendChild(separation);
  const validerform = document.createElement("button");
  validerform.classList.add("disabled");
  validerform.type = "submit";
  validerform.textContent = "Valider";
  ajoutForm.appendChild(validerform);
  //verification des champs avant envoie de la requete
  function verifierFormulaire() {
    if (ajoutForm.checkValidity()) {
      validerform.classList.remove("disabled");
      validerform.classList.add("activated");
    } else {
      // zone activation/deactivation bouton
      validerform.classList.remove("activated");
      validerform.classList.add("disabled");
    }
  }
  ajoutForm.addEventListener("input", verifierFormulaire); // verifie le titre
  ajoutForm.addEventListener("change", verifierFormulaire); // verifie la categorie
  const erreur = document.createElement("p"); // message formulaire incomplet
  erreur.textContent = "Veuillez compléter tous les champs.";
  erreur.style.color = "red";
  erreur.style.textAlign = "center";
  // envoie de la requete ajout photo
  ajoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!ajoutForm.checkValidity()) {
      // si form incomplet
      ajoutForm.appendChild(erreur);
      return;
    }
    // creation de la requete
    const formData = new FormData();

    formData.append("image", ajoutPhoto.files[0]);
    formData.append("title", titreInput.value);
    formData.append("category", categorieSelect.value);
    // envoie de la requete
    const reponse = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    //requete valider
    if (reponse.status === 201) {
      const nouveauTravaux = await reponse.json();

      listTraveaux.push(nouveauTravaux);
      afficherTraveaux(listTraveaux);

      erreur.textContent = "Ajout du travail confirmé"; // message confirmation
      erreur.style.color = "green";
      ajoutForm.appendChild(erreur);
      // remise a zero du formulaire
      ajoutForm.reset();

      const preview = zoneImage.querySelector(".preview");

      if (preview) {
        preview.remove();
      }

      zoneImage.appendChild(iconePhoto);
      zoneImage.appendChild(ajoutBtn);
      zoneImage.appendChild(infoPhoto);

      validerform.classList.remove("activated");
      validerform.classList.add("disabled");
    }
  });
  // enlever le message erreur/validation
  ajoutForm.addEventListener("input", () => {
    erreur.remove();
  });

  ajoutForm.addEventListener("change", () => {
    erreur.remove();
  });
  // retour modale gallerie
  retour.addEventListener("click", () => {
    modale.innerHTML = "";
    modale.classList.remove("modale2");
    modale.classList.add("modale");
    afficherModale();
  });
}
