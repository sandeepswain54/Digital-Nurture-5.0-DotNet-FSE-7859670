import React from 'react';
import { useParams } from 'react-router-dom';
import trainersMock from './TrainersMock';

function TrainerDetails() {
  const { id } = useParams();
  const trainer = trainersMock.find(t => t.trainerId === parseInt(id));

  if (!trainer) {
    return <p>Trainer not found</p>;
  }

  return (
    <div>
      <h2>Trainer Details</h2>
      <p>ID: {trainer.trainerId}</p>
      <p>Name: {trainer.name}</p>
      <p>Email: {trainer.email}</p>
      <p>Phone: {trainer.phone}</p>
      <p>Technology: {trainer.technology}</p>
      <p>Skills: {trainer.skills.join(', ')}</p>
    </div>
  );
}

export default TrainerDetails;
