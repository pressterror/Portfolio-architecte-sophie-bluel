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
    modale.innerHTML = "";
    modale.classList.remove("modale");
    modale.classList.add("modale2");
    affichermodale2();
  });

  for (const travaux of listTraveaux) {
    //generation galerie photro
    const cards = document.createElement("div");
    cards.classList.add("photo");

    const photo = document.createElement("img");
    photo.src = travaux.imageUrl;
    cards.appendChild(photo);

    const icone = document.createElement("button");
    icone.type = "button";
    cards.appendChild(icone);
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

      console.log(reponse.status);

      if (reponse.ok) {
        listTraveaux = listTraveaux.filter(
          (element) => element.id !== travaux.id,
        );
        cards.remove();
        afficherTraveaux(listTraveaux);
      }
    });
    const supprimer = document.createElement("img");
    supprimer.src = "./assets/icons/supprimer.svg";
    icone.appendChild(supprimer);

    galerie.appendChild(cards);
  }
  croix.addEventListener("click", () => {
    modale.innerHTML = "";
    overlay.classList.add("cache");
  });
}
// ouverture/fermeture et changement de modale
modifier.addEventListener("click", () => {
  overlay.classList.remove("cache");
  afficherModale();
});

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    modale.innerHTML = "";
    overlay.classList.add("cache");
  }
});
/***************** MODALE 2 ******************/
async function affichermodale2() {
  const reponseCategories = await fetch("http://localhost:5678/api/categories");
  const listCategories = await reponseCategories.json();
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
  ajoutBtn.addEventListener("click", () => {
    ajoutPhoto.click();
  });
  ajoutPhoto.addEventListener("change", () => {
    const fichier = ajoutPhoto.files[0];
    const tailleMax = 4 * 1024 * 1024;
    if (fichier.type !== "image/jpeg" && fichier.type !== "image/png") {
      const erreur = document.createElement("p");
      erreur.textContent = "Format d'image non valide";
      erreur.style.color = "red";
      zoneImage.appendChild(erreur);
    } else if (fichier.size > tailleMax) {
      const erreur = document.createElement("p");
      erreur.textContent = "Le fichier est trop volumineux";
      erreur.style.color = "red";
      zoneImage.appendChild(erreur);
    } else {
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
  function verifierFormulaire() {
    if (ajoutForm.checkValidity()) {
      validerform.classList.remove("disabled");
      validerform.classList.add("activated");
    } else {
      validerform.classList.remove("activated");
      validerform.classList.add("disabled");
    }
  }
  ajoutForm.addEventListener("input", verifierFormulaire);
  ajoutForm.addEventListener("change", verifierFormulaire);
  const erreur = document.createElement("p");
  erreur.textContent = "Veuillez compléter tous les champs.";
  erreur.style.color = "red";
  erreur.style.textAlign = "center";
  ajoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!ajoutForm.checkValidity()) {
      ajoutForm.appendChild(erreur);
      return;
    }

    const formData = new FormData();

    formData.append("image", ajoutPhoto.files[0]);
    formData.append("title", titreInput.value);
    formData.append("category", categorieSelect.value);

    const reponse = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (reponse.status === 201) {
      const nouveauTravaux = await reponse.json();

      listTraveaux.push(nouveauTravaux);
      afficherTraveaux(listTraveaux);

      erreur.textContent = "Ajout du travail confirmé";
      erreur.style.color = "green";
      ajoutForm.appendChild(erreur);

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
  ajoutForm.addEventListener("input", () => {
    erreur.remove();
  });

  ajoutForm.addEventListener("change", () => {
    erreur.remove();
  });
  retour.addEventListener("click", () => {
    modale.innerHTML = "";
    modale.classList.remove("modale2");
    modale.classList.add("modale");
    afficherModale();
  });
}
