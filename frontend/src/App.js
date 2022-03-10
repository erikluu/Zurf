import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
// eslint-disable-next-line import/no-webpack-loader-syntax
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
