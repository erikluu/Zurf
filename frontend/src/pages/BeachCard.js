import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Page.css";


function BeachCard(props) {
  const user = props.userData[0];
  const beach = user.beaches[props.index]
  const navigate = useNavigate();

  function handleSubmit(e) {
      e.preventDefault();
      props.clearUser();
      navigate("/");
    }

  return (
    <div className="wrapper">
      <div className="logo">
        {" "}
        <img
          src="https://www.freepnglogos.com/uploads/sun-png/illustration-sun-icon-weather-hot-seem-13.png"
          alt=""
        />{" "}
      </div>
      <div className="account">
        <h1>Account Info</h1>
        <p>Welcome, {user.name}!</p>
        <p>Your email is {user.email}</p>
      </div> 
      <button className="btn" onClick={handleSubmit}>
        Log Out
      </button>
    </div>
  );
}

export default BeachCard