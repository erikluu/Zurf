import "./App.css";
import React, { useRef, useEffect, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Map from "./components/Map.js";
import SurfSpotCard from "./components/SurfSpotCard";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

function App() {
  return (
    <div>
      <Map />
      <SurfSpotCard />
    </div>
  );
}

export default App;
