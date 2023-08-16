import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const apiUrl = 'http://mqtt.zusan.in:8081/getDeviceData?deviceId=04:e9:e5:14:90:26';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    }
  };

  return (
    <div>
      <h1>Device Data</h1>
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
