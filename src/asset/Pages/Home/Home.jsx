import React from "react";
import "./Home.css";
import Chart from "./Chart.jsx";
import HerdsList from "./HerdsList.jsx";
const Dashboard   = () => {
  return (
        <div className="div_main">
          <HerdsList />
          <Chart />

        </div>
  );
};
export default Dashboard ;
