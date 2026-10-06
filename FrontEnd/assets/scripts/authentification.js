const lienConnexion = document.querySelector('nav a[href*="login"]');
const token = sessionStorage.getItem("token");

if (token) {
  // si connecter generation des nouveau element mode 'admin connecter
  console.log("Utilisateur connecté");
  lienConnexion.textContent = "logout";

  const div = document.createElement("div"); // creation Mode edition
  const modeEdition = document.createElement("p");
  const modifier = document.createElement("p");
  const img = document.createElement("img");
  div.classList.add("mode-edition");
  img.src = "./assets/icons/Vector.svg";
  img.alt = "édition";
  const img2 = document.createElement("img");
  img2.src = "./assets/icons/Vector2.svg";
  img2.alt = "édition";
  modeEdition.textContent = "Mode édition";
  div.appendChild(img);
  div.appendChild(modeEdition);

  document.querySelector("body").prepend(div);

  // creation modifier
  const portfolioTitle = document.querySelector(".portfolio-title");

  modifier.textContent = "modifier";

  portfolioTitle.appendChild(img2);
  portfolioTitle.appendChild(modifier);
}
// deconnection utilisateur
lienConnexion.addEventListener("click", (e) => {
  if (token !== null) {
    e.preventDefault();
    sessionStorage.removeItem("token");
    lienConnexion.textContent = "login";
    window.location.reload();
  }
});
