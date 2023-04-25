const input = document.querySelector("input.login__input");
const button = document.querySelector("button.login__button");
const form = document.querySelector("form.login-form");

const validadeInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "");
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem("player", input.value);
  window.location = "pages/game.html";
};

input.addEventListener("input", validadeInput);
form.addEventListener("submit", handleSubmit);
