import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Install react-datepicker library

function ReportGenerator() {
  const [reportType, setReportType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vehicleType, setVehicleType] = useState(""); // Added state for vehicle type
  const [registrationYear, setRegistrationYear] = useState(null); // Added state for registration year

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    setStartDate(null); // Reset dates on type change
    setEndDate(null);
    setVehicleType(""); // Reset vehicle type on type change
    setRegistrationYear(null); // Reset registration year on type change
  };

  const handleDateChange = (date, setDate) => {
    // Ensure previous day is selected if clicking on a date before current selection
    if (date && startDate && date < startDate) {
      setStartDate(date);
    } else {
      setDate(date); // Update either start or end date
    }
  };

  const isPreviousDay = (date) => {
    return date && startDate && date.getDate() === startDate.getDate() - 1;
  };

  const renderReportOptions = () => {
    if (reportType === "Vehicle Rental") {
      const years = [];
      for (let year = 2010; year <= new Date().getFullYear(); year++) {
        years.push(year);
      }

      return (
        <div>
          <h2>Vehicle Rental Report</h2>
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange(date, setStartDate)}
            disabled={endDate} // Disable start date selection if end date is set
            isDaySelectable={(date) => !isPreviousDay(date)} // Prevent selecting previous day of existing start date
          />
          <label htmlFor="endDate">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDateChange(date, setEndDate)}
            minDate={startDate} // Set minimum date to selected start date
          />
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <select
            name="vehicleType"
            id="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="" disabled>
              ChooseType
            </option>
            <option value="allTypes">All Types</option>
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
          </select>
          <label htmlFor="registrationYear">Registration Year:</label>
          <select
            name="registrationYear"
            id="registrationYear"
            value={registrationYear}
            onChange={(e) => setRegistrationYear(e.target.value)}
          >
            <option value="" disabled>
              Choose Year
            </option>
            <option value="allYears">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Report Generator</h1>
      <label htmlFor="reportType">Report Type:</label>
      <select
        name="reportType"
        id="reportType"
        value={reportType}
        onChange={handleReportTypeChange}
      >
        <option value="">Select</option>
        <option value="Vehicle Rental">Vehicle Rental</option>
        <option value="Service Station">Service Station</option>
        <option value="Financial">Financial</option>
      </select>
      {renderReportOptions()}
      {/* Add a button to trigger report generation logic based on reportType and options */}
      <button
        disabled={
          !reportType ||
          !startDate ||
          !endDate ||
          !vehicleType ||
          !registrationYear
        }
      >
        Generate Report
      </button>
    </div>
  );
}

export default ReportGenerator;
