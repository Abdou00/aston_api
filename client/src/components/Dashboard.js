import React, { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";
import { useNavigate } from "react-router-dom";
import { handleCreateSchedule, time } from "../utils/ressource";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!localStorage.getItem('_id')) navigate('/')
  }, [navigate]);

  // Màj du tableau des horaires de début et de fin
  const handleTimeChange = (e, id) => {
    const { name, value } = e.target;

    if (value === "Select time") return;

    const list = [...schedule];
    console.log(list);
    list[id][name] = value;

    setSchedule(list);
  }

  const handleSaveSchedules = () => {
    if (JSON.stringify(selectedTimezone) !== "{}") {
      console.log(schedule);
      handleCreateSchedule(selectedTimezone, schedule, navigate);
    } else {
      toast.error("Select your timezone");
    }
  };

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

          { schedule.map((sch, id) => (
            <div className="form" key={id}>
              <p>{ sch.day }</p>

              <div className="select__wrapper">
                <label htmlFor="startTime">Start Time</label>
                <select
                  name="startTime"
                  id="startTime"
                  onchange={(e) => handleTimeChange(e, id)}
                >
                  { time.map((t) => (
                    <option key={id} id={t.id} value={t.hour}>
                      { t.hour }
                    </option>
                  )) }
                </select>
              </div>

              <div className="select__wrapper">
                <label htmlFor="endTime">End Time</label>
                <select
                  name="endTime"
                  id="endTime"
                  onchange={(e) => handleTimeChange(e, id)}
                >
                  { time.map((t) => (
                    <option key={id} id={t.id} value={t.hour}>
                      { t.hour }
                    </option>
                  )) }
                </select>
              </div>
            </div>
          )) }
        </div>

        <div className="saveBtn__container">
          <button onClick={handleSaveSchedules}>Save</button>
        </div>
      </main>
    </div>
  )
}

export default Dashboard;