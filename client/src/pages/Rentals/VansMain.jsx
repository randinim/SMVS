import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/rentalVehicles'); // Replace with your API endpoint to fetch all vehicles
        const vans = res.data.filter(vehicle => vehicle.vehiclecategory === 'van'); // Filter only vans
        setVehicles(vans); // Set the list of vans
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

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.numberplate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">List of Vans</h2>
      
      <input
        type="text"
        placeholder="Search by number plate"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map(vehicle => (
          <li key={vehicle._id} className="border border-gray-200 rounded p-4">
            <p className="font-bold">{vehicle.vehiclemodel}</p>
            <p className="text-gray-600">{vehicle.numberplate}</p>
            <div className="mt-2 flex justify-between">
              <Link to={`/updateVehicle/${vehicle._id}`} className="text-blue-600 hover:text-blue-800">Update</Link>
              <button onClick={() => handleDelete(vehicle._id)} className="text-red-600 hover:text-red-800">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListVehicle;
