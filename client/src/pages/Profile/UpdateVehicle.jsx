import React, { useState } from "react";
import ApiHelper from "../../helper/apiHelper";

const UpdateVehicle = ({ vehicleId, vehicleData }) => {
  const [formData, setFormData] = useState(vehicleData);

  const { make, model, year, registrationnumber, fueltype, dailyusage, licensenumber, licenseissued, licenseexpiry, insurancenumber, insurancetype, expirydate, issueddate } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = new ApiHelper();
      const token = localStorage.getItem("token"); // Assuming you are storing the token in localStorage
      await api.put(`profile/vehicle/${vehicleId}`, formData, token);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Add your form fields here */}
      <button type="submit">Update Vehicle</button>
    </form>
  );
};

export default UpdateVehicle;
