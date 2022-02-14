import "./App.css";
import React, { useRef, useEffect, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Map from "./components/Map.js";
import SurfSpotCard from "./components/SurfSpotCard";

function App() {
  return (
    <div>
      <Map />
      <SurfSpotCard />
    </div>
  );
}

export default App;
