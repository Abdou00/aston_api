import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookingDetails, sendEmail } from "../utils/ressource";
import ErrorPage from "./ErrorPage";

const BookUser = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [timezone, setTimezone] = useState('');
  const [error, setError] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [duration, setDuration] = useState('');

  const { user } = useParams();

  useEffect(() => {
    fetchBookingDetails(
      user,
      setError,
      setTimezone,
      setSchedule,
      setReceiverEmail
    );
  }, [user]);

  if (error) return <ErrorPage error="User doesn't exist" />

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(receiverEmail, email, fullName, message, duration);
    console.log(email, fullName, message);
    setFullName('');
    setMessage('');
  }

  return (
    <div className="bookContainer">
      <h2 className="bookTitle">Book a session with</h2>

      <form action="" className="booking__form">
        <div className="select__wrapper">
          <label htmlFor="Full Name">c</label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            value={fullName}
            onchange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="select__wrapper">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onchange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="select__wrapper">
          <label htmlFor="message">Message</label>
          <textarea
            rows={5}
            id="message"
            name="message"
            value={message}
            onchange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <label htmlFor="session">
          Select your preffered session - GMT+1 Paris
        </label>

        <select name="duration" id="duration">
          { schedules.map((schedule) => (
            <option
              value={`${schedule.day} - ${schedule.startTime} - ${schedule.endTime}`}
              key={schedule.day}
            >
              {`${schedule.day} - ${schedule.startTime} - ${schedule.endTime}`}
            </option>
          )) }
        </select>

        <button className="bookingBtn">Send</button>
      </form>
    </div>
  );
}

export default BookUser;