const backmenu = () => {
  window.location = "../index.html";
};

document.addEventListener("DOMContentLoaded", function () {
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const leaderboardTable = document.querySelector("#leaderboard-table tbody");

  leaderboardTable.innerHTML = "";

  const lastPlayer = JSON.parse(localStorage.getItem("lastPlayer"));
  if (lastPlayer) {
    const existingPlayerIndex = players.findIndex(
      (player) => player.name === lastPlayer.name
    );
    if (existingPlayerIndex !== -1) {
      if (
        existingPlayerIndex !== -1 &&
        (!players[existingPlayerIndex].results ||
          !players[existingPlayerIndex].results.includes(
            Number(lastPlayer.time)
          ))
      ) {
        if (!players[existingPlayerIndex].results) {
          players[existingPlayerIndex].results = [];
        }
        players[existingPlayerIndex].results.push(Number(lastPlayer.time));
        players[existingPlayerIndex].results.sort((a, b) => a - b);
      }
    } else {
      players.push({
        name: lastPlayer.name,
        results: [Number(lastPlayer.time)],
      });
    }
  }
  const allResults = [];
  players.forEach((player) => {
    if (player.results) {
      allResults.push(...player.results);
    }
  });

  allResults.sort((a, b) => a - b);

  let rank = 1;
  allResults.forEach((time) => {
    const row = leaderboardTable.insertRow();
    const rankCell = row.insertCell();
    const nameCell = row.insertCell();
    const timeCell = row.insertCell();

    const player = players.find(
      (player) => player && player.results && player.results.includes(time)
    );

    rankCell.textContent = rank;
    if (player && player.results && player.results.length > 0) {
      nameCell.textContent = player.name;
    } else {
      nameCell.textContent = "Nenhum resultado para este jogador";
    }
    timeCell.textContent = time;

    rank++;
  });
  localStorage.setItem("players", JSON.stringify(players));
});

const clearLeaderboardButton = document.querySelector("#clear-leaderboard");
clearLeaderboardButton.addEventListener("click", function () {
  const leaderboardTable = document.querySelector("#leaderboard-table tbody");
  leaderboardTable.innerHTML = "";
  localStorage.removeItem("players");
  localStorage.removeItem("lastPlayer");
  alert("Tabela de classificação limpa.");
});