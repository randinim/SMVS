import React, { useState, useEffect } from "react";
import ApiHelper from "../../helper/apiHelper";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavbarAfter";
import Footer from "../../components/Footer";

const api = new ApiHelper(); // Initialize an instance of ApiHelper

const ShowVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State variable for the search term
  const [isResponsiveSearch, setIsResponsiveSearch] = useState(false); // State variable for responsive search box

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Fetch vehicles using the ApiHelper get method
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
        const data = await api.get("profile/vehicles", {}, token);
        setVehicles(data); // Update the vehicles state with the fetched data
      } catch (error) {
        console.error("Error fetching vehicles:", error.message);
      }
    };

    fetchVehicles(); // Call the fetchVehicles function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  const handleDelete = async (vehicleId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`profile/vehicle/${vehicleId}`, token);
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
    } catch (error) {
      console.error("Error deleting vehicle:", error.message);
    }
  };

  // Filter vehicles based on the search term
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="mt-28 text-2xl font-bold mb-4">Vehicles</h1>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search by make"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsResponsiveSearch(true)}
          onBlur={() => setIsResponsiveSearch(false)}
          className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        />
        {isResponsiveSearch && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            
          </div>
        )}
      </div>
      {filteredVehicles.length === 0 ? (
        <p>No vehicles available</p>
      ) : (
        <ul className="w-full max-w-md">
          {filteredVehicles.map((vehicle) => (
            <li key={vehicle._id} className="border border-gray-300 p-8 rounded-md mb-4 text-center">
              <p>Make: {vehicle.make}</p>
              <p>Model: {vehicle.model}</p>
              <p>Year: {vehicle.year}</p>
              <p>Registration Number: {vehicle.registrationnumber}</p>
              <p>Fuel Type: {vehicle.fueltype}</p>
              <p>Daily Usage: {vehicle.dailyusage}</p>
              <p>License Number: {vehicle.licensenumber}</p>
              <p>License Issued Date: {new Date(vehicle.licenseissued).toLocaleDateString()}</p>
              <p>License Expiry Date: {new Date(vehicle.licenseexpiry).toLocaleDateString()}</p>
              <p>Insurance Number: {vehicle.insurancenumber}</p>
              <p>Insurance Type: {vehicle.insurancetype}</p>
              <p>Insurance Expiry Date: {new Date(vehicle.expirydate).toLocaleDateString()}</p>
              <p>Insurance Issued Date: {new Date(vehicle.issueddate).toLocaleDateString()}</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 mt-5 mb-5"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/AddVehicles" className="block mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-5">
          Add Vehicle
        </button>
      </Link>
      <Link to="/Profile" className="block mt-2">
        <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 mb-14 mt-5">
          Go back
        </button>
      </Link>
    </div>
    </>
  );
};

export default ShowVehicle;
