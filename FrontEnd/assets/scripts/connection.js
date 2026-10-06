//  DOM
const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const messageErreurConnexion = document.querySelector(
  "#message-erreur-connexion",
);
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let valid = true;

  for (const input of [email, password]) {
    input.setCustomValidity(""); // verification des champs personaliser

    if (input === email) {
      // message email vide ou non conforme
      if (email.validity.valueMissing) {
        email.setCustomValidity("Veuillez renseigner votre adresse e-mail.");
      } else if (email.validity.patternMismatch) {
        email.setCustomValidity("Format de l'adresse e-mail invalide.");
      }
    }

    if (input === password) {
      if (password.validity.valueMissing) {
        password.setCustomValidity("Veuillez renseigner votre mot de passe.");
      }
    }

    if (!input.checkValidity()) {
      // arrete la verfication a la 1er erreur
      valid = false;
      input.reportValidity();
      break;
    }
  }
  if (valid) {
    // apres verification des champ
    const emailUtilisateur = email.value;
    const passwordUtilisateur = password.value;
    const identifiant = {
      email: emailUtilisateur,
      password: passwordUtilisateur,
    };
    // envoie de la requete
    const requeteConnection = JSON.stringify(identifiant);
    const envoie = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requeteConnection,
    });
    const reponse = await envoie.json();
    if (envoie.status === 401 || envoie.status === 404) {
      // en cas erreur identifiant
      messageErreurConnexion.classList.add("attention");
      messageErreurConnexion.textContent = "E-mail ou mot de passe invalide.";
      password.value = "";
      return;
    } else if (envoie.status >= 500) {
      //en cas de probleme serveur
      alert("Le serveur rencontre un problème.");
      return;
    }
    // conection reussi recuperation token et redirection index
    sessionStorage.setItem("token", reponse.token);
    window.location.href = "index.html";
  }
});
// enleve le message erreur
password.addEventListener("input", () => {
  messageErreurConnexion.textContent = "";
  messageErreurConnexion.classList.remove("attention");
});
