import React, { useState } from 'react';
// import Weather from '../components/Weather';

const MainPage = () => {
  const [selectedCity, setSelectedCity] = useState('New York');

  return (
    <div>
      <h1>Weather App</h1>
      <select onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="New York">New York</option>
        <option value="London">London</option>
        <option value="Tokyo">Tokyo</option>
        <option value="Paris">Paris</option>
      </select>
      {/* <Weather city={selectedCity} /> */}
    </div>
  );
};

export default MainPage;