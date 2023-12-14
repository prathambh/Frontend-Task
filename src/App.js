import React, { useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import SearchInput from './components/SearchInput';
import DateRangeInput from './components/DateRangeInput';
import { getAlerts } from './services/alertData';
import { getVehicles } from './services/vehicleData';

function App() {
  const initialAlerts = getAlerts();
  const [alerts, setAlerts] = useState(initialAlerts);
  const vehicles = getVehicles();

  const handleSearch = (searchTerm, vehicle, startDate, endDate) => {
    let filteredAlerts = initialAlerts;

    if (searchTerm) {
      filteredAlerts = initialAlerts.filter((alert) =>
        Object.values(alert).some(
          (value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (vehicle) {
      filteredAlerts = filteredAlerts.filter((alert) =>
        alert.vehicle_friendly_name.toLowerCase().includes(vehicle.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filteredAlerts = filteredAlerts.filter((alert) => {
        const alertDate = new Date(alert.timestamp).toISOString().split('T')[0];
        return alertDate >= startDate && alertDate <= endDate;
      });
    }

    setAlerts(filteredAlerts);
  };

  const handleMarkFalseAlarm = (alertId) => {
    // Removing the alert with the specified ID
    const updatedAlerts = alerts.filter((alert) => alert.id !== alertId);
    setAlerts(updatedAlerts);
  };

  return (
    <div className="container">
      <div className="app-header">
        <h1>Driver Monitoring Alerts</h1>
      </div>
      <div className="flex justify-between mt-4">
        <div className="task-box">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="task-box">
          <DateRangeInput onSearch={handleSearch} />
        </div>
      </div>
      <div className="mt-4">
        {alerts.length === 0 ? (
          <p>No alerts found based on the current filters.</p>
        ) : (
          alerts.map((alert) => (
            <Alert key={alert.id} alert={alert} onMarkFalseAlarm={() => handleMarkFalseAlarm(alert.id)} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
