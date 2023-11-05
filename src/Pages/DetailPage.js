import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function DetailPage(props) {
  const { year, category } = useParams();
  const location = useLocation();

  // Access the laureates prop from the location state
  const winners = location?.state?.winners;
  console.log(winners);

  // Access data and display laureates for the specific year and category

  return (
    <div>
      <div className='bg-black py-5 d-flex justify-content-center'>
        <Link to='/'>
          <button className='banner-btn '>GO TO HOME PAGE</button>
        </Link>
      </div>
      <div className='container'>
        <h2 className='text-center my-5 fw-bold text-uppercase'>
          {category}- {year}
        </h2>
        <div>
          {winners && (
            <div>
              <div className='row g-5'>
                {winners.map((winner, index) => (
                  <div className='col-4'>
                    <div className='card_2'>
                      <h4 className='text-center text-uppercase my-2'>
                        {winner.firstname}
                        <span> {winner.surname}</span>
                      </h4>
                      <div className='d-flex align-items-center justify-content-center mb-2 '>
                        <h6>ID : {winner.id}</h6>
                      </div>
                      <p className='pt-2' style={{ fontSize: '14px' }}>
                        {winner.motivation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
