import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function DetailPage() {
  const { year, category } = useParams();
  const location = useLocation();
  const laureates = location.state && location.state.laureates;

  // Access data and display laureates for the specific year and category

  return (
    <div>
      <h2>{category} - {year}</h2>
      <ul>
        {laureates && laureates.map((laureate, index) => (
          <li key={index}>{laureate.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DetailPage;