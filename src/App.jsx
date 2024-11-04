import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [optionData, setOptionData] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_option_data');
        setOptionData(response.data.option_chain);
        setSummary(response.data.summary);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Options Data Analysis</h1>
      <h2>Summary</h2>
      <ul>
        <li>Total Call OI: {summary.totalCallOI}</li>
        <li>Total Put OI: {summary.totalPutOI}</li>
        <li>Put to Call Ratio: {summary.putToCallRatio}</li>
        <li>Max Call OI Strike Price: {summary.maxCallOI_StrikePrice}</li>
        <li>Max Put OI Strike Price: {summary.maxPutOI_StrikePrice}</li>
        <li>Max OI Strike Price: {summary.maxOI_StrikePrice}</li>
      </ul>
      <h2>Option Data</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Call OI</th>
            <th>Call Price</th>
            <th>Strike Price</th>
            <th>Put Price</th>
            <th>Put OI</th>
          </tr>
        </thead>
        <tbody>
          {optionData.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
