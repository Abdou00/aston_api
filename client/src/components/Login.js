import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/ressource";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username.trim() && password.trim()) {
      handleLogin(username, password, navigate);
      console.log({username, password});
      setUsername('');
      setPassword('');
    }
  };

  return (
    <main className="login">
      <form action="" className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Log into your account</h2>

        <label htmlFor="">Username</label>
        <input
          type="text"
          className="username"
          id="username"
          name="username"
          value={username}
          onchange={(e) => setUsername(e.target.value)}
        />
        
        <label htmlFor="">Password</label>
        <input
          type="text"
          className="password"
          id="password"
          name="password"
          value={password}
          onchange={(e) => setPassword(e.target.value)}
        />
        
        <button className="loginButton">Login</button>
        <p style={{
          textAlign: "center",
          marginTop: "30px"
        }}>
          Don't have an accout?
          <Link className="link" to="/register">Signup</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;