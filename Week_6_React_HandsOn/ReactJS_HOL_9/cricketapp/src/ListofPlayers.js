import React from 'react';

const players = [
  { name: 'Player1', score: 45 },
  { name: 'Player2', score: 78 },
  { name: 'Player3', score: 32 },
  { name: 'Player4', score: 90 },
  { name: 'Player5', score: 65 },
  { name: 'Player6', score: 55 },
  { name: 'Player7', score: 88 },
  { name: 'Player8', score: 40 },
  { name: 'Player9', score: 72 },
  { name: 'Player10', score: 60 },
  { name: 'Player11', score: 95 }
];

function ListofPlayers() {
  const belowSeventy = players.filter(player => player.score < 70);

  return (
    <div>
      <h2>All Players</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name} - Score: {player.score}</li>
        ))}
      </ul>

      <h2>Players with score below 70</h2>
      <ul>
        {belowSeventy.map((player, index) => (
          <li key={index}>{player.name} - Score: {player.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListofPlayers;
