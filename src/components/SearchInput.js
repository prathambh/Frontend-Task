// src/components/SearchInput.js
import React, { useState, useEffect } from 'react';
import { getVehicles } from '../services/vehicleData'; // You'll need to create this function

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState([]);
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  useEffect(() => {
    const fetchedVehicles = getVehicles(); 
    setVehicles(fetchedVehicles);
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-input">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
        placeholder="Search..."
      />
      <button onClick={() => onSearch(searchTerm)} className="search-button">
        Search
      </button>
      <select onChange={(e) => onSearch(e.target.value)}>
        <option value=""></option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.friendly_name}>
            {vehicle.friendly_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchInput;
