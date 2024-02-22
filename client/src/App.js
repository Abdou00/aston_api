import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import BookUser from "./components/BookUser";
// Configuration React-Toastify
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactTostify.css";
// Style
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/register" element={ <Signup /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/profile/:id" element={ <Profile /> } />
          <Route path="/book/:user" element={ <BookUser /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
