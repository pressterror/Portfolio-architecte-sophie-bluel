const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const messageErreurConnexion = document.querySelector(
  "#message-erreur-connexion",
);
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("SUBMIT DÉCLENCHÉ");
  let valid = true;

  for (const input of [email, password]) {
    input.setCustomValidity("");

    if (input === email) {
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
      valid = false;
      input.reportValidity();
      break;
    }
  }
  console.log("valid =", valid);
  if (valid) {
    console.log("Format des champs valide");
    const emailUtilisateur = email.value;
    const passwordUtilisateur = password.value;
    const identifiant = {
      email: emailUtilisateur,
      password: passwordUtilisateur,
    };
    const requeteConnection = JSON.stringify(identifiant);
    const envoie = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requeteConnection,
    });
    const reponse = await envoie.json();
    console.log(reponse);
    if (envoie.status === 401 || envoie.status === 404) {
      messageErreurConnexion.classList.add("attention");
      messageErreurConnexion.textContent = "E-mail ou mot de passe invalide.";
      password.value = "";
      return;
    } else if (envoie.status === 404) {
      alert("Service de connexion introuvable.");
      return;
    } else if (envoie.status >= 500) {
      alert("Le serveur rencontre un problème.");
      return;
    }
    console.log("connexion reussi.");
    sessionStorage.setItem("token", reponse.token);
    window.location.href = "index.html";
  }
});
password.addEventListener("input", () => {
  messageErreurConnexion.textContent = "";
  messageErreurConnexion.classList.remove("attention");
});
