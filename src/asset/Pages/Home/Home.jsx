import React from "react";
import "./Home.css";
import Chart from "./Chart.jsx";
import HerdsList from "./HerdsList.jsx";
const Dashboard   = () => {
  return (
        <div>
          <Chart />
          <HerdsList />
        </div>
  );
};
export default Dashboard ;
