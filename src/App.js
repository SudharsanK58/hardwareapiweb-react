import React, { useState, useEffect } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [deviceId, setDeviceId] = useState('04:e9:e5:14:90:26'); // Default device ID
  const apiUrl = `http://mqtt.zusan.in:8081/getDeviceData?deviceId=${deviceId}`;

  useEffect(() => {
    fetchData();
  }, [deviceId]); // Fetch data whenever deviceId changes

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
    <ChakraProvider>
    <div className="centered-container">
      <h1 className="centered-heading"><Heading>Device ID: {deviceId}</Heading>
      </h1>
      <div className="device-selector">
          <Stack direction={['column', 'row']} spacing="24px">
            <Select
              className="custom-dropdown"
              value={deviceId}
              width="10%"
              onChange={(e) => setDeviceId(e.target.value)}
            >
              <option value="04:e9:e5:14:90:26">Device 1</option>
              <option value="04:e9:e5:15:70:ac">Device 2</option>
              <option value="04:e9:e5:15:70:8b">Device 3</option>
              {/* Add more options as needed */}
            </Select>
            <Button
              colorScheme="blue"
              className="custom-button"
              onClick={fetchData}
            >
              Get Device Data
            </Button>
          </Stack>
        </div>
      {error ? (
        <p className="error-message">Error fetching data: {error.message}</p>
      ) : (
        <div>
          <DataBox title="ble" data={data.ble} colorClass="blue-box" />
          <DataBox title="mqtt" data={data.mqtt} colorClass="green-box" />
          <DataBox title="validation" data={data.validation} colorClass="red-box" />
        </div>
      )}
    </div>
    </ChakraProvider>
  );
}

function DataBox({ title, data, colorClass }) {
  const [editableData, setEditableData] = useState(data); // Initialize editableData with data

  const handleInputChange = (key, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  if (!data) {
    return null;
  }

  return (
    <ChakraProvider>
      <div className={`data-box ${colorClass}`}>
        <h2>{title}</h2>
        <div className="data-list">
          {Object.keys(editableData).map((key) => (
            <div key={key}>
              <strong>{key}:</strong>
              {typeof editableData[key] === "string" ? (
                <Input
                  placeholder={`Enter ${key}`}
                  value={editableData[key]}
                  width="20%"
                  margin="20px"
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              ) : (
                <p>{editableData[key].toString()}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
