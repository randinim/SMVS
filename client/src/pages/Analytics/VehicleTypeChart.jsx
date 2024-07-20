import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import { BarChartData } from "../../../routes/api/rentalVehicleReport";

import downloadPDF from "../../../routes/api/reportPDFGenerator";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const BarChart = () => {
//   const options = {};
//   //const data = {};

//   return <Bar option={options} data={BarChartData} />;
// };

const VehicleTypeChart = () => {
  //const pdfRef = useRef(null);

  // const handleDownloadPDF = () => {
  //   downloadPDF(pdfRef.current.id, "rentalVehicleReportData");
  // };

  return (
    <div
      //ref={pdfRef}
      id="vehicleReportContent"
    >
      <h1>Vehicle Rental Report</h1>
      <h2>Number of Rental Vehicles of each type</h2>
      <Bar
        //option={}
        data={BarChartData}
      />

      {/* <button onClick={handleDownloadPDF}>Download Report</button> */}
    </div>
  );
};

export default VehicleTypeChart;
