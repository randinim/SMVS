import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ListVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/rentalVehicles'); // Replace with your API endpoint to fetch all vehicles
        const cars = res.data.filter(vehicle => vehicle.vehiclecategory === 'car'); // Filter only cars
        setVehicles(cars); // Set the list of cars
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/rentalVehicles/delete/${id}`); // Replace with your API endpoint to delete a vehicle by ID
      setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle._id !== id)); // Remove the deleted vehicle from the list
    } catch (err) {
      console.error(err.response.data);
      // Optionally, you can show an error message here
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.numberplate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container pl-48 mt-28'>
      <h2 className="text-2xl font-bold mb-4">List of Cars</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Number Plate"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <ul>
        {filteredVehicles.map(vehicle => (
          <li key={vehicle._id} className="border-b border-gray-300 py-2">
            <p className="text-lg font-medium">{vehicle.vehiclemodel}</p>
            <p className="text-sm text-gray-500">{vehicle.numberplate}</p>
            <div className="mt-2">
              <Link to={`/updateVehicle/${vehicle._id}`} className="text-blue-500 hover:text-blue-700 mr-2">Update</Link>
              <button onClick={() => handleDelete(vehicle._id)} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </li>
        ))}
      </ul>
     
    </div>
  
  );
};

export default ListVehicle;
