import React from "react";
import { location } from "../assets";

const Statistics = () => {
  return (
    <div className="dashboard">
      <h1>Statistics</h1>
      <p>
        <img src={location} alt="location" />
        <span>Current Location :</span>Mukamira, Nyabihu
      </p>
    </div>
  );
};

export default Statistics;
