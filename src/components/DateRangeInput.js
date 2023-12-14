// src/components/DateRangeInput.js
import React, { useState } from 'react';

const DateRangeInput = ({ onSearch }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearch = () => {
    onSearch(startDate, endDate);
  };

  return (
    <div className="date-range-input">
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={handleStartDateChange} />
      <label>End Date:</label>
      <input type="date" value={endDate} onChange={handleEndDateChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default DateRangeInput;
