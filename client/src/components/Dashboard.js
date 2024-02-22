import React, { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [schedule, setSchedule] = useState([
    {day: "Sun", startTime: "", endTime: ""},
    {day: "Mon", startTime: "", endTime: ""},
    {day: "Tue", startTime: "", endTime: ""},
    {day: "Wed", startTime: "", endTime: ""},
    {day: "Thu", startTime: "", endTime: ""},
    {day: "Fri", startTime: "", endTime: ""},
    {day: "Sat", startTime: "", endTime: ""},
  ]);
  
  const navigate = useNavigate();

  // Purge le local storage à la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('_id');
    localStorage.removeItem('_myEmail');
    navigate('/');
  }

  return (
    <div className="container">
      <nav className="dashboard__nav">
        <h2>BookMe</h2>
        <button className="logout">Logout</button>
      </nav>

      <main className="dashboard__main">
        <h2 className="dashboard__heading">Select your disponibility</h2>

        <div className="timezone__wrapper">
          <p>Your timezone</p>

          <TimezoneSelect
            value={selectedTimezone}
            onchange={selectedTimezone}
          />
        </div>
      </main>
    </div>
  )
}

export default Dashboard;