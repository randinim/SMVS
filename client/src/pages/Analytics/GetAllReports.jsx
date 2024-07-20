import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { getAllReports } from "../../api/report";

import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you use Axios for API calls

const [reports, setReports] = useState([]);
export const ShowAllReports = () => {
  useEffect(() => {
    const getReports = async () => {
      try {
        const res = await getAllReports();
        // console.log("res=>", res);
        setReports(res);
      } catch (error) {
        console.error("Error fetching reports: ", error.message);
      }
    };

    getReports();
    // getCards();
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Creator</th>
          <th>Created Date</th>
          {/* Add more headers for other report properties */}
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report.id}>
            <td>{report.name}</td>
            <td>{report.creator}</td>
            <td>{new Date(report.createdDate).toLocaleDateString()}</td>
            {/* Add more table cells for other report properties */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
