import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import LoginForm from "./components/LoginForm";
// eslint-disable-next-line import/no-webpack-loader-syntax

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

const testUser = {
  email: "carlo@dumb.com",
  password: "imstupid",
};

function App() {
  const [user, setUser] = useState({ email: "" });
  const [error, setError] = useState("");
  const Login = (details) => {
    console.log(details);
    if (details.email === testUser.email && details.password === testUser.password) {
      console.log("logged in");
      setUser({ email: details.email });
    } else {
      console.log("details do not match");
      setError("Details do not match.");
    }
  };

  const Logout = () => {
    console.log("Logged out.");
  };

  return (
    <div>
      {user.email !== "" ? <Dashboard User={user} /> : <LoginForm Login={Login} error={error} />}
    </div>
  );
}

export default App;
