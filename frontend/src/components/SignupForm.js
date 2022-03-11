import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Login.css";

import { useNavigate } from "react-router-dom";

function SignupForm({ error }) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await axios.post(`http://localhost:8000/users`, details);
    console.log(result);
    if (result) {
      console.log(result);
      console.log("Successfully signed up!");
      navigate("/");
      return result;
    } else {
      console.log("Something went wrong");
      navigate("/signup");
    }
  };
  
  return (
    <div className="wrapper">
      <div className="logo">
        {" "}
        <img
          src="https://www.freepnglogos.com/uploads/sun-png/illustration-sun-icon-weather-hot-seem-13.png"
          alt=""
        />{" "}
      </div>
      <form onSubmit={submitHandler}>
        <div className="name">
          <h2>Sign Up</h2>
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="form-field">
            <label html="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
            />
          </div>
          <div className="form-field">
            <label html="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              value={details.email}
            />
          </div>
          <div className="form-field">
            <label html="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setDetails({ ...details, password: e.target.value })}
              value={details.password}
            />
          </div>
          <input className="btn" type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
