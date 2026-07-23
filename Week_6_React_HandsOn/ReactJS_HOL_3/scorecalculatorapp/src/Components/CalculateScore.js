import React from 'react';
import '../Stylesheets/mystyle.css';

function CalculateScore(props) {
  const { name, school, total, goal } = props;
  const average = (total / goal).toFixed(2);

  return (
    <div className="score-container">
      <h2>Student Score Calculator</h2>
      <p>Name: {name}</p>
      <p>School: {school}</p>
      <p>Total Marks: {total}</p>
      <p>Out of: {goal}</p>
      <p className="score-value">Average Score: {average}</p>
    </div>
  );
}

export default CalculateScore;
