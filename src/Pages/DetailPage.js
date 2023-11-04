import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

function DetailPage(props) {
  const { year, category } = useParams();
  const location = useLocation();

  // Access the laureates prop from the location state
  const winners = location?.state?.winners;
  console.log(winners);

  // Access data and display laureates for the specific year and category

  return (
    <div>
      <h2>
        {category} - {year}
      </h2>
      {winners && (
        <div>
          <div className='row g-5'>
            {winners.map((winner, index) => (
              <div className='col-4'>
                <div className='card'>
                  <h4>
                    {winner.firstname}
                    {winner.surname}
                  </h4>
                  <p>{winner.motivation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
