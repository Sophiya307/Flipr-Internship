import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';



function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace 'your_api_url_here' with the actual API URL you want to fetch from.
    fetch('http://api.nobelprize.org/v1/prize.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>API Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={() => console.log(data)}>Log Data to Console</button>
          <ul>
            {data[1].map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
