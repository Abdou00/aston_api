import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (username.trim() && password.trim() && email.trim()) {
      e.preventDefault();

      console.log({email, username, password});
      setEmail('');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <main className="signup">
      <form action="" className="signup__form" onSubmit={handleSubmit}>
        <h2 className="signup__title">Create an account</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="email"
          id="email"
          name="email"
          value={email}
          onchange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="username"
          id="username"
          name="username"
          value={username}
          onchange={(e) => setUsername(e.target.value)}
          required
        />
        
        <label htmlFor="password">Password</label>
        <input
          type="text"
          className="password"
          id="password"
          name="password"
          value={password}
          onchange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button className="signupButton">Signup</button>
        <p style={{
          textAlign: "center",
          marginTop: "30px"
        }}>
          You have an account?
          <Link className="link" to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default Signup;