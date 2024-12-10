import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`https://localhost:${import.meta.env.VITE_GET_PORT}/api/data`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
        if (error.response) {
          console.error("Response data", error.response.data);
          console.error("Response status", error.response.status);
          console.error("Response headers", error.response.headers);
        } else if (error.request) {
          console.error("Request data", error.request);
        } else {
          console.error("Error message", error.message);
        }
      }
    }

    getData();
  }, []);

  return (
    <div className="App">
      <h1>Google Sheets Data</h1>
      <table>
        <tbody>
          <tr>
            {console.log("sheets data", data)}
            {/* {data[0] && data[0].map((header, index) => <th key={index}>{header}</th>)} */}
          </tr>
        </tbody>
        <tbody>
          {/* {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)} 
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default App;