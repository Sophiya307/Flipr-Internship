import "../App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BannerImage from "../assets/img1.jpg";
import "../component.css";
import { Link } from "react-router-dom";
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
        console.error("Error fetching data:", error);
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

  const handleCategoryClick = (category, year, laureates) => {
    setSelectedCategory(category);
    setSelectedYear(year);
  };

  const cardData = [1, 2, 3, 4, 5, 6];

  return (
    <div className="App">
      <div className="banner">
        <div class="container">
          <div class="row">
            <div class="col-6 my-5 py-5 d-flex flex-column align-items-center">
              <h3 className="my-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </h3>
              <button className="banner-btn">Nobel Prize Winners</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black">
        <div className="container">
          <div className="row justify-content-center">
            <div>
              <h4>Category</h4>
              <h4>Year</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {Object.keys(data).map((year) => (
          <div>
            <h2>Year {year}</h2>
            <div className="row g-5">
              {data[year].map((prize, index) => (
                <div className="col-4">
                  <Link
                    to={{
                      pathname: `/detailpage/${year}/${prize.category}`,
                      state: { laureates: prize.laureates }, // Pass laureates array as state
                    }}
                  >
                    <div className="card">
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
