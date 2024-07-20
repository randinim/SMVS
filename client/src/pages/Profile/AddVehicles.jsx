import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { PaperClipIcon } from '@heroicons/react/20/solid';
import ApiHelper from "../../helper/apiHelper";
import Navbar from "../../components/NavbarAfter";

const AddVehicle = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registrationnumber: "",
    fueltype: "",
    dailyusage: "",
    licensenumber: "",
    licenseissued: "",
    licenseexpiry: "",
    insurancenumber: "",
    insurancetype: "",
    expirydate: "",
    issueddate: "",
  });

  const {
    make,
    model,
    year,
    registrationnumber,
    fueltype,
    dailyusage,
    licensenumber,
    licenseissued,
    licenseexpiry,
    insurancenumber,
    insurancetype,
    expirydate,
    issueddate,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = new ApiHelper();
      const token = localStorage.getItem("token"); // Assuming you are storing the token in localStorage
      await api.put("profile/vehicle", formData, token);

      // Redirect to profile page
      navigate("/ShowVehicle");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="text-center">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900 mt-28 mb-10">
          Add Vehicle
        </h3>
      </div>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-4">
          <label
            htmlFor="make"
            className="block text-sm font-medium text-gray-700"
          >
            Make:
          </label>
          <input
            type="text"
            id="make"
            name="make"
            value={make}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700"
          >
            Model:
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={model}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year:
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={year}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="registrationnumber"
            className="block text-sm font-medium text-gray-700"
          >
            Registration Number:
          </label>
          <input
            type="text"
            id="registrationnumber"
            name="registrationnumber"
            value={registrationnumber}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fueltype"
            className="block text-sm font-medium text-gray-700"
          >
            Fuel Type:
          </label>
          <input
            type="text"
            id="fueltype"
            name="fueltype"
            value={fueltype}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dailyusage"
            className="block text-sm font-medium text-gray-700"
          >
            Daily Usage:
          </label>
          <input
            type="text"
            id="dailyusage"
            name="dailyusage"
            value={dailyusage}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="licensenumber"
            className="block text-sm font-medium text-gray-700"
          >
            License Number:
          </label>
          <input
            type="text"
            id="licensenumber"
            name="licensenumber"
            value={licensenumber}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="licenseissued"
            className="block text-sm font-medium text-gray-700"
          >
            License Issued Date:
          </label>
          <input
            type="date"
            id="licenseissued"
            name="licenseissued"
            value={licenseissued}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="licenseexpiry"
            className="block text-sm font-medium text-gray-700"
          >
            License Expiry Date:
          </label>
          <input
            type="date"
            id="licenseexpiry"
            name="licenseexpiry"
            value={licenseexpiry}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="insurancenumber"
            className="block text-sm font-medium text-gray-700"
          >
            Insurance Number:
          </label>
          <input
            type="text"
            id="insurancenumber"
            name="insurancenumber"
            value={insurancenumber}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="insurancetype"
            className="block text-sm font-medium text-gray-700"
          >
            Insurance Type:
          </label>
          <input
            type="text"
            id="insurancetype"
            name="insurancetype"
            value={insurancetype}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="expirydate"
            className="block text-sm font-medium text-gray-700"
          >
            Insurance Expiry Date:
          </label>
          <input
            type="date"
            id="expirydate"
            name="expirydate"
            value={expirydate}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="issueddate"
            className="block text-sm font-medium text-gray-700"
          >
            Insurance Issued Date:
          </label>
          <input
            type="date"
            id="issueddate"
            name="issueddate"
            value={issueddate}
            onChange={onChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 block mx-auto mt-8"
        >
          Add Vehicle
        </button>
      </form>
    </>
  );
};

export default AddVehicle;
