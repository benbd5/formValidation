const inputUser = document.querySelector(".user-form:nth-child(1) input");
const inputMail = document.querySelector(".user-form:nth-child(2) input");
const inputMdp = document.querySelector(".user-form:nth-child(3) input");
const inputConfirmMdp = document.querySelector(".user-form:nth-child(4) input");

const allCheckIcon = document.querySelectorAll(".fa-check-circle");
const allXIcon = document.querySelectorAll(".fa-times-circle");

const allSpan = document.querySelectorAll("span");
const allLigne = document.querySelectorAll(".ligne div");

// Vérif nom utilisateur
inputUser.addEventListener("input", (e) => {
  if (e.target.value.length < 3) {
    allXIcon[0].style.display = "inline";
    allCheckIcon[0].style.display = "none";
    allSpan[0].style.display = "inline";
  } else if (e.target.value.length <= 24) {
    allCheckIcon[0].style.display = "inline";
    allXIcon[0].style.display = "none";
    allSpan[0].style.display = "none";
  }
});

// Vérif mail (avec un regex)
inputMail.addEventListener("input", (e) => {
  /* REGEX simple pour un mail
   ** S (majuscule) correspond à un caractère qui n'est pas un blanc = pas un espace
   ** + (le signe) correspond à l'expression précédente qui est répétée une ou plusieurs fois
   ** @ (le signe) correspond au signe @
   ** S+ pour qu'aucun espace vide, de blanc ne soit pris en compte
   ** . (le signe) correspond au . (avant "com" ou "fr" par exemple)
   ** S+ pour après le .
   */
  const regexEmail = /\S+@\S+\.\S+/;

  //   search permet de vérifier la valeur de l'input avec le regex
  // si ça correspond, c'est égal à zéro, sinon à -1
  if (e.target.value.search(regexEmail) === -1) {
    allXIcon[1].style.display = "inline";
    allCheckIcon[1].style.display = "none";
    allSpan[1].style.display = "inline";
  } else if (e.target.value.search(regexEmail) === 0) {
    allCheckIcon[1].style.display = "inline";
    allXIcon[1].style.display = "none";
    allSpan[1].style.display = "none";
  }
});

// Vérif mot de passe (avec un regex)
let valeurInput;

/* accent circonflexe = tout ce qu n'est pas écrit à la suite de ^
 ** Donc, tous les caractères spéciaux
 */
const specialCar = /[^a-zA-Z0-9]/;
const aplhabet = /[a-z]/i; // toutes les lettres en minuscules = a-z, le i permet que les lettres soient en majuscules après
const chiffres = /[0-9]/; // chiffres entre 0 et 9
// le regex aurait été possible en une seule variable
// const nbCaract = document.querySelector("#userMdp").value;

let objValidation = {
  symbole: 0,
  lettre: 0,
  chiffre: 0,
  nbCar: 0,
};

inputMdp.addEventListener("input", (e) => {
  valeurInput = e.target.value;

  if (valeurInput.search(specialCar) !== -1) {
    // signifie que ça a trouvé un symbole
    objValidation.symbole = 1;
  }
  if (valeurInput.search(aplhabet) !== -1) {
    // signifie que ça a trouvé une lettre
    objValidation.lettre = 1;
  }
  if (valeurInput.search(chiffres) !== -1) {
    // signifie que ça a trouvé un chiffre
    objValidation.chiffre = 1;
  }
  if (e.target.value.length >= 8) {
    // signifie que ça a trouvé 8 caractères
    objValidation.nbCar = 1;
  }

  if ((e.inputType = "deleteContentBackward")) {
    // permet de vérifier à nouveau quand un élément du mdp est effacé et repasse à zéro les objets concernés
    if (valeurInput.search(specialCar) === -1) {
      objValidation.symbole = 0;
    }
    if (valeurInput.search(aplhabet) === -1) {
      objValidation.lettre = 0;
    }
    if (valeurInput.search(chiffres) === -1) {
      objValidation.chiffre = 0;
    }
  }

  // boucle for in permet de vérifier tous les éléments de l'objet objValidation
  // si supérieur à 0 = validation ok
  let testAll = 0;
  for (const property in objValidation) {
    if (objValidation[property] > 0) {
      testAll++;
    }
  }

  if (testAll < 4) {
    // on a pas passé les 3 validations
    allSpan[2].style.display = "inline";
    allXIcon[2].style.display = "inline";
    allCheckIcon[2].style.display = "none";
  } else {
    // validations passées
    allSpan[2].style.display = "none";
    allXIcon[2].style.display = "none";
    allCheckIcon[2].style.display = "inline";
  }

  //   Force mot de passe
  if (valeurInput.length <= 3 && valeurInput.length > 0) {
    allLigne[0].style.display = "block";
    allLigne[1].style.display = "none";
    allLigne[2].style.display = "none";
  } else if (valeurInput.length > 6 && valeurInput.length <= 8) {
    allLigne[0].style.display = "block";
    allLigne[1].style.display = "block";
    allLigne[2].style.display = "none";
  } else if (valeurInput.length > 8) {
    allLigne[0].style.display = "block";
    allLigne[1].style.display = "block";
    allLigne[2].style.display = "block";
  } else if (valeurInput.length === 0) {
    allLigne[0].style.display = "none";
    allLigne[1].style.display = "none";
    allLigne[2].style.display = "none";
  }
});

// Confirmation
inputConfirmMdp.addEventListener("input", (e) => {
  if (e.target.value.length === 0) {
    allXIcon[3].style.display = "inline";
    allCheckIcon[3].style.display = "none";
  } else if (e.target.value === valeurInput) {
    allXIcon[3].style.display = "none";
    allCheckIcon[3].style.display = "inline";
  } else {
    allXIcon[3].style.display = "inline";
    allCheckIcon[3].style.display = "none";
  }
});
