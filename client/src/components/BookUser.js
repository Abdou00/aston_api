import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BookUser = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessaage] = useState('');

  const { user } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, fullName, message);
    setFullName('');
    setMessaage('');
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
            onchange={(e) => setMessaage(e.target.value)}
            required
          />
        </div>

        <label htmlFor="session">
          Select your preffered session - GMT+1 Paris
        </label>

        <button className="bookingBtn">Send</button>
      </form>
    </div>
  );
}

export default BookUser;