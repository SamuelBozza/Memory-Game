const backmenu = () => {
  window.location = "../index.html";
}

document.addEventListener('DOMContentLoaded', function() {
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const leaderboardTable = document.querySelector("#leaderboard-table tbody");

  leaderboardTable.innerHTML = "";

  const lastPlayer = JSON.parse(localStorage.getItem("lastPlayer"));
  if (lastPlayer) {
    console.log("Último jogador adicionado: ", lastPlayer);
    const existingPlayerIndex = players.findIndex(
      (player) => player.name === lastPlayer.name
    );
    if (existingPlayerIndex !== -1) {
      console.log("Jogador encontrado na lista de jogadores: ", players[existingPlayerIndex]);
      if (!players[existingPlayerIndex].results.includes(Number(lastPlayer.time))) {
        players[existingPlayerIndex].results.push(Number(lastPlayer.time));
        players[existingPlayerIndex].results.sort((a, b) => a - b); // Ordena os resultados em ordem crescente
      }
    } else {
      players.push({
        name: lastPlayer.name,
        results: [Number(lastPlayer.time)],
      });
    }
  }

  players.sort((a, b) => a.results[0] - b.results[0]); // Ordena os jogadores pelo menor tempo

  console.log("Lista de jogadores atualizada: ", players);

  let rank = 1;
  players.forEach((player) => {
    player.results.forEach((time) => {
      const row = leaderboardTable.insertRow();
      const rankCell = row.insertCell();
      const nameCell = row.insertCell();
      const timeCell = row.insertCell();

      rankCell.textContent = rank;
      nameCell.textContent = player.name;
      timeCell.textContent = time;

      rank++;
    });
  });

  console.log("Tabela de classificação atualizada.");

  localStorage.setItem("players", JSON.stringify(players));
  console.log("Lista de jogadores salva no localStorage.");
});
