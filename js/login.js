const input = document.querySelector("input.login__input");
const button = document.querySelector(".login__button");
const button2 = document.querySelector(".login__button2");
const form = document.querySelector("form.login-form");

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "");
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  localStorage.setItem("player", input.value);
  window.location.href = "pages/game.html";
};

const goLeaderboard = () => {
  window.location.href = "pages/leaderboard.html";
};

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
