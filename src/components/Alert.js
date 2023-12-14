// src/components/Alert.js
import React from 'react';

const Alert = ({ alert, onMarkFalseAlarm }) => {
  const { id, alert_type, timestamp, driver_friendly_name, vehicle_friendly_name } = alert;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="alert">
      <p>
        <span className="type">
            <strong>{alert_type}</strong></span>
        <span className="time"> • {formatDate(timestamp)}</span>
      </p>
      <p style={{ fontSize: '0.8rem' }}>
        <span style={{ fontWeight: 'bold',fontSize:'0.8rem' }}>Driver</span>
        <span style={{ fontSize: '0.7rem' }}> • {driver_friendly_name} / {vehicle_friendly_name}</span>
      </p>
      <div>
        <button onClick={onMarkFalseAlarm} className="mark-false-alarm-button">
          <span role="img" aria-label="Bell" style={{ marginRight: '0.5rem' }}>
            🔔
          </span>
          Mark As False Alarm
        </button>
      </div>
    </div>
  );
};

export default Alert;
