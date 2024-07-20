import React, { useState } from 'react';
import axios from 'axios'; // You need to install axios for making HTTP requests
import ResponsiveDrawer from '../../Layout/Drawer'

const NewVehicleForm = () => {
  const [formData, setFormData] = useState({
    vehiclecategory: '',
    vehiclemodel: '',
    numberplate: '',
    passengersno: 0,
    condition: '',
    distance: '',
    additionaldetails: '',
    color: ''
  });

  const { vehiclecategory, vehiclemodel, numberplate, passengersno, condition, distance, additionaldetails, color } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/rentalVehicles', formData); // Make sure to replace this with your actual API endpoint
      console.log(res.data); // Log response data
      // Optionally, you can redirect or show a success message here
    } catch (err) {
      console.error(err.response.data);
      // Optionally, you can show an error message here
    }
  };

  return (
    <ResponsiveDrawer>
    <div className='px-96'>
      <h2>Add New Vehicle</h2>
      <div className='container  '>
      <form onSubmit={onSubmit}>
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
        <button type="submit">Add Vehicle</button>
      </form>
      </div>
    </div>
    </ResponsiveDrawer>
  );
};

export default NewVehicleForm;
