import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
// eslint-disable-next-line import/no-webpack-loader-syntax
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import Account from "./pages/Account"
import Loc1 from "./pages/Location1"
import Loc2 from "./pages/Location2"

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

function App() {

  const [user, setUser] = useState();

  function getUser(person) {
    setUser(person);
  }

  function clearUser() {
    setUser(undefined);
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginForm getUser={getUser}/>} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/Dashboard" element={<Dashboard userData={user}/>} />
          <Route path="/account" element={<Account userData={user} clearUser={clearUser}/>} />
          <Route path="/loc1" element={<Loc1 />} />
          <Route path="/loc2" element={<Loc2 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
