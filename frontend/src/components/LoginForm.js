import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Login.css";

import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const [details, setDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let result = await axios.get(
      `http://localhost:8000/login?email=${details.email}&password=${details.password}`
    );
    result = result.data.users_list;
    if (result === undefined || result.length !== 1) {
      console.log("wrong username and password");
    } else {
      props.getUser(result);
      navigate("/dashboard");
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
          <h2>Login</h2>
          {/*{error !== "" ? <div className="error">{error}</div> : ""}*/}
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
          <input className="btn" type="submit" value="Login" />
        </div>
      </form>

      <div className="text-center fs-6">
        {" "}
        <a href="/Signup">Don't have an account? Sign up!</a>{" "}
      </div>
    </div>
  );
}

export default LoginForm;
