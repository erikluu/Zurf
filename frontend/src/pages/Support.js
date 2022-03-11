import React from 'react';
import "./Page.css";


function Account() {
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
        <h1>Zurf</h1>
        <h3>Developed By</h3>
        <p>Erik Luu</p>
        <p>Brett Hickman</p>
        <p>Jack Ortega</p>
        <p>Carlo Ruggiero</p>
      </div> 
      <button className="btn">
        Send Us Money
      </button>

    </div>
    
    
  );
}

export default Account;