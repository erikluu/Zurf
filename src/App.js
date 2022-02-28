import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import Navbar from './components/Navbar';
// eslint-disable-next-line import/no-webpack-loader-syntax
//import Dashboard from "./components/Dashboard.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Location2 from './pages/Location2';
import Location1 from './pages/Location1';
import Home from './pages/Home.js';
//import LoginForm from "./components/LoginForm";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

const testUser = {
  email: "carlo@dumb.com",
  password: "imstupid",
};

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