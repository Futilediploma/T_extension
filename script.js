document.getElementById('searchButton').addEventListener('click', function() {
  const playerName = document.getElementById('playerName').value;
  if (!playerName) {
      alert("Please enter a player name.");
      return;
  }

  // Example API call to Tarkov.dev (you'll need to adapt this to the actual API)
  fetch(`https://api.tarkov.dev/player/${playerName}`)
      .then(response => response.json())
      .then(data => {
          displayPlayerData(data);
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('result').innerText = "Player not found or an error occurred.";
      });
});

function displayPlayerData(data) {
  const resultDiv = document.getElementById('result');
  
  // Displaying player stats
  const statsHtml = `
      <div class="stats">
          <h3>Player Stats</h3>
          <p>Level: ${data.level}</p>
          <p>K/D Ratio: ${data.kdRatio}</p>
          <p>Survival Rate: ${data.survivalRate}%</p>
          <p>Favorite Weapon: ${data.favoriteWeapon}</p>
      </div>
  `;
  
  // Displaying raid loot
  const lootHtml = `
      <div class="loot">
          <h3>Raid Loot</h3>
          <ul>
              ${data.raidLoot.map(item => `<li>${item.name}</li>`).join('')}
          </ul>
      </div>
  `;
  
  resultDiv.innerHTML = statsHtml + lootHtml;
}
