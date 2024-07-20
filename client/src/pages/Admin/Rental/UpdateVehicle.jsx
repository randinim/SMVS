// UpdateVehicle.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


const UpdateVehicle = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    vehiclecategory: '',
    vehiclemodel: '',
    numberplate: '',
    passengersno: '',
    condition: '',
    distance: '',
    additionaldetails: '',
    color: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/rentalVehicles/${id}`); // Corrected API endpoint
        setFormData(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchData();
  }, [id]);

  const { vehiclecategory, vehiclemodel, numberplate, passengersno, condition, distance, additionaldetails, color } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/rentalVehicles/update/${id}`, formData); // Corrected API endpoint
      console.log(res.data);
      // Optionally, you can redirect or show a success message here
    } catch (err) {
      console.error(err.response.data);
      // Optionally, you can show an error message here
    }
  };

  return (
    
    <div className='container px-96'>
      <h2>Update Vehicle</h2>
      <form onSubmit={onSubmit}>
        {/* Input fields */}
        <div className='mb-8'>
        <input type="text" placeholder="Vehicle Category" name="vehiclecategory" value={vehiclecategory} onChange={onChange} required />
          </div>
          <div className='mb-8'>
        <input type="text" placeholder="Vehicle Model" name="vehiclemodel" value={vehiclemodel} onChange={onChange} required />
        </div>
        <div className='mb-8'>
        <input type="text" placeholder="Number Plate" name="numberplate" value={numberplate} onChange={onChange} required />
        
        </div>
        <div className='mb-8'>
        <input type="number" placeholder="Passengers No" name="passengersno" value={passengersno} onChange={onChange} required />
        </div>
        <div className='mb-8'>
        <input type="text" placeholder="Condition" name="condition" value={condition} onChange={onChange} required />
        </div>
        <div className='mb-8'>
        <input type="text" placeholder="Distance" name="distance" value={distance} onChange={onChange} required />
        </div>
        <div className='mb-8'>
        <input type="text" placeholder="Additional Details" name="additionaldetails" value={additionaldetails} onChange={onChange} />
        </div>
        <div className='mb-8'>
        <input type="text" placeholder="Color" name="color" value={color} onChange={onChange} required />
        </div>
        <button type="submit">Update Vehicle</button><br/>
        <Link to={`/rentalservice/carsmain`}><button type="submit">Back</button></Link>


      </form>
    </div>
    
  );
};

export default UpdateVehicle;
