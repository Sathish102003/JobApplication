// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditJob from './pages/EditJob';
import Navbar from './components/Navbar';
import CreateJob from './pages/CreateJob';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditJob />} />
        <Route path="/create" element={<CreateJob />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
