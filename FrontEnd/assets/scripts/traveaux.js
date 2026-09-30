const galerieTraveaux = document.querySelector(".gallery");

async function chargerTraveaux() {
  const dataTraveaux = await fetch("http://localhost:5678/api/works");
  const listTraveaux = await dataTraveaux.json();
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

  /*console.log(listTraveaux);
  console.log(listTraveaux[0].id);
  console.log(listTraveaux[0].title);
  console.log(listTraveaux[0].imageUrl);*/
}
chargerTraveaux();

//traveaux = listTraveaux[0].id;
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
