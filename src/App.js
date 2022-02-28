import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Location2 from './pages/Location2';
import Location1 from './pages/Location1';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/loc1' element={<Location1/>} />
          <Route path='/loc2' element={<Location2/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
