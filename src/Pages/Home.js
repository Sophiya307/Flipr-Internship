import '../App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../component.css';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap'; // Import React-Bootstrap components
import calender from '../assets/calender.png';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    fetch(`https://api.nobelprize.org/v1/prize.json`)
      .then((response) => response.json())
      .then((data) => {
        // Group prizes by year
        const groupedData = groupByYear(data.prizes);
        setData(groupedData);
        setLoading(false);
        console.log(groupedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Helper function to group data by year
  const groupByYear = (prizes) => {
    const groupedData = {};

    prizes.forEach((prize) => {
      const year = prize.year;
      if (!groupedData[year]) {
        groupedData[year] = [];
      }
      groupedData[year].push(prize);
    });

    return groupedData;
  };

  const getUniqueCategories = () => {
    const categories = new Set();
    Object.keys(data).forEach((year) => {
      data[year].forEach((prize) => {
        categories.add(prize.category);
      });
    });
    return Array.from(categories);
  };

  const getUniqueYears = () => {
    return Object.keys(data);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedYear(null);
  };

  return (
    <div className='App'>
      <div className='banner'>
        <div class='container'>
          <div class='row'>
            <div class='col-6 my-5 py-5 d-flex flex-column align-items-center'>
              <h3 className='my-5'>
                "Empowering the Next Generation of Visionaries: Celebrating and
                Honoring Exceptional Young Achievers from Diverse Walks of Life
                and a Multitude of Fields and Categories, Inspiring Future
                Generations to Dream, Aspire, and Achieve Remarkable Success"
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-black'>
        <div className='container'>
          <div className='d-flex align-items-center justify-content-end'>
            <DropdownButton
              title='Select Category'
              id='categoryDropdown'
              onSelect={handleCategoryChange}
              className='my-5'
            >
              {getUniqueCategories().map((category) => (
                <Dropdown.Item key={category} eventKey={category}>
                  {category}
                </Dropdown.Item>
              ))}
              <Dropdown.Item eventKey={null}>
                Reset Category Filter
              </Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              title='Select Year'
              id='yearDropdown'
              onSelect={handleYearChange}
              className='my-3 ms-3'
            >
              {getUniqueYears().map((year) => (
                <Dropdown.Item key={year} eventKey={year}>
                  {year}
                </Dropdown.Item>
              ))}
              <Dropdown.Item eventKey={null}>Reset Year Filter</Dropdown.Item>
            </DropdownButton>

            <button onClick={handleReset} className='my-5 btn btn-primary ms-3'>
              Reset Filters
            </button>
          </div>
        </div>
              
      </div>

      <div className='container'>
        <div></div>

        {selectedYear ? (
          <div className='d-flex align-items-center justify-content-center'>
            <img src={calender} className='cal me-2' alt='cal' />
            <h2 className='my-5'>Year {selectedYear}</h2>
          </div>
        ) : null}

        {Object.keys(data).map((year) => (
          <div key={year}>
            {selectedYear == null ? (
              <div className='d-flex align-items-center justify-content-center'>
                <img src={calender} className='cal me-2' alt='cal' />
                <h2 className='my-5'>Year {year}</h2>
              </div>
            ) : null}

            <div className='row g-5 my-2'>
              {data[year]
                .filter(
                  (prize) =>
                    (selectedCategory
                      ? prize.category === selectedCategory
                      : true) && (selectedYear ? year === selectedYear : true)
                )
                .map((prize, index) => (
                  <div className='col-4' key={index}>
                    <Link
                      to={{
                        pathname: `/detailpage/${year}/${prize.category}`,
                      }}
                      state={{ winners: prize.laureates }}
                    >
                      <div className='card justify-content-center'>
                        <h2>{prize.category}</h2>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
