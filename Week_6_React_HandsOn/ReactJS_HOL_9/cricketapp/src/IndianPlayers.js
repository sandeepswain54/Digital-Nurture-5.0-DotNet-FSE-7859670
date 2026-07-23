import React from 'react';

function IndianPlayers() {
  const oddEvenTeam = { oddTeam: 'Team A', evenTeam: 'Team B' };
  const { oddTeam, evenTeam } = oddEvenTeam;

  const T20players = ['Rohit', 'Virat', 'Hardik'];
  const RanjiTrophyPlayers = ['Shubman', 'Ishan', 'Prithvi'];
  const allPlayers = [...T20players, ...RanjiTrophyPlayers];

  return (
    <div>
      <h2>Indian Players</h2>
      <p>Odd Team: {oddTeam}</p>
      <p>Even Team: {evenTeam}</p>

      <h3>Merged Players (T20 + Ranji Trophy)</h3>
      <ul>
        {allPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}

export default IndianPlayers;
