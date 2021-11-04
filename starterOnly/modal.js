function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
/**
 * [querySelector description]
 *
 * @type {HTMLElement}
 */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
/**
 * @type {HTMLFormElement}
 */
const formElement = document.querySelector("form");
const closeBtn = document.querySelector("span.close");
const btnSubmit = document.querySelector("input.btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// closing modal form
function closingModal() {
  modalbg.style.display = "none";
}

// closing modal event
closeBtn.addEventListener("click", closingModal);

/**
 * Disabled btn submit form
 *
 * @return  {void}
 */
function formDisabled() {
  var formCheck = "true";
  formData.forEach(div => {
    if (div.getAttribute("data-error-visible") === "true") {
      formCheck = "false";
    }
  });
  if (formCheck === "false") {
    btnSubmit.setAttribute("disabled", "true");
  } else {
    btnSubmit.removeAttribute("disabled");
  }
}

/**
 * affiche un message d'erreur
 *
 * @param   {String}  msg    [msg description]
 * @param   {HTMLInputElement}  input  [input description]
 *
 * @return  {void}         [return description]
 */
function message(msg, input) {
  const target = input.parentNode;
  // @ts-ignore
  target.setAttribute("data-error-visible", msg !== "");
  // @ts-ignore
  target.setAttribute("data-error", msg);
  formDisabled();
}

const inputs = document.querySelectorAll("input");
inputs.forEach(input => { listenerHandler(input); });

/**
 * Switch case type input
 *
 * @param   {HTMLInputElement}  input
 *
 * @return  {void}
 */
function listenerHandler(input) {
  switch (input.type) {
    case "text":
      input.oninput = checkInputText;
      break;
    case "email":
      input.oninput = checkInputEmail;
      break;
    case "number":
      input.oninput = checkInputNumber;
      break;
    case "radio":
      input.oninput = checkInputRadio;
      break;
    case "date":
      input.oninput = checkInputDate;
      break;
    case "checkbox":
      if (input.name === "checkbox1") {
        input.onchange = checkInputCheckbox;
      }
      break;
  }
}

/**
 * Check input type text
 *
 * @return  {void} 
 */
function checkInputText() {
  var errorMsg = "";
  const reg = /[^a-zA-Z/-]/g;
  const ok = !reg.test(this.value);
  if (ok === false) {
    errorMsg = errorMsg + "Veuillez entrer uniquement des lettres. ";
  }
  if (!this.checkValidity()) {
    errorMsg = errorMsg + "Veuillez entrer 2 caractères ou plus. ";
  }
  message(errorMsg, this);
}

/**
 * Check input type email
 *
 * @return  {void}
 */
function checkInputEmail() {
  var errorMsg = "";
  if (!this.checkValidity()) {
    errorMsg = errorMsg + "Veuillez saisir une adresse email valide. ";
  }
  message(errorMsg, this);
}

/**
 * Check input type number
 *
 * @return  {void}
 */
function checkInputNumber() {
  var errorMsg = "";
  if (!this.checkValidity()) {
    errorMsg = errorMsg + "Veuillez saisir un nombre compris entre 0 et 99. ";
  }
  message(errorMsg, this);
}

/** 
 * Check input type radio
 *
 * @return  {void}
 */
function checkInputRadio() {
  var errorMsg = "";
  if (this.value === "") {
    errorMsg = errorMsg + "Veuillez choisir une ville. ";
  }
  message(errorMsg, this);
}

/**
 * Check input type checkbox
 *
 * @return  {void}
 */
function checkInputCheckbox() {
  var errorMsg = "";
  if (this.checked === false) {
    errorMsg = errorMsg + "Veuillez accepter les conditions d'utilisation. ";
  }
  message(errorMsg, this);
}

/**
 * Check input type email
 *
 * @return  {void}
 */
function checkInputDate() {
  var errorMsg = "";
  const reg = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  const ok = reg.test(this.value);
  if (!ok || !this.checkValidity()) {
    errorMsg = errorMsg + "Veuillez saisir une date valide. ";
  }
  message(errorMsg, this);
}



formElement.addEventListener("submit", validate);
function validate(event) {
  event.preventDefault();
  formElement.animate([
    // keyframes
    { transform: "scaleY(1)" },
    { transform: "scaleY(0)" }
  ], {
    // timing options
    duration: 500,
    iterations: 1,
    fill: "forwards"
  });
  setTimeout(validateSuite, 500);
}

function validateSuite(){
  formElement.parentElement.innerHTML = 
  "<div class='backform'>"+
  "<span class='backform'>Thank you for submitting your registration details</span>"+
  "<input class='btn-submit backform' type='submit' value='Close' onclick='closingModal()'></div>";    
}



