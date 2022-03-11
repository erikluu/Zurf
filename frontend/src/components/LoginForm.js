import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Login.css";

import { useNavigate } from "react-router-dom";

function LoginForm({ error }) {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // storing input name
    localStorage.setItem("user_details", JSON.stringify(userDetails));
  }, [userDetails]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await axios.get(
      `http://localhost:8000/login?email=${details.email}&password=${details.password}`
    );

    setUserDetails(result);

    console.log(result);
    if (result) {
      console.log(result);
      console.log("correct!");
      navigate("/dashboard");
      return result;
    } else {
      console.log("wrong username and password");
      navigate("/");
    }
  };

  // async function authUser() {
  //   try {
  //     const handleSubmit = async (e) => {
  //       e.preventDefault();
  //       const result = await axios.get(
  //        `http://localhost:8000/login?email=${details.email}&password=${details.password}`
  //      );

  //       if (result) {
  //        //console.log(result);
  //        console.log("correct!");
  //         navigate("/dashboard");
  //         return result;
  //        } else {
  //         console.log("wrong username and password");
  //         navigate("/");
  //       }
  //     };
  //  } catch (error) {
  //     //We're not handling errors. Just logging into the console.
  //     console.log("Error: " + error);
  //     return false;
  //   }
  //  }

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
          {error !== "" ? <div className="error">{error}</div> : ""}
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
      <div class="text-center fs-6">
        {" "}
        <a href="#">Don't have an account? Sign up!</a>{" "}
      </div>
    </div>
  );
}

export default LoginForm;
