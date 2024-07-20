import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAfter";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateProfile from "./CreateProfile";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const Profile = () => {
  const [vehicleOwner, setVehicleOwner] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Update profile state
  const [updatedProfile, setUpdatedProfile] = useState({
    nic: "",
    address: "",
    licensenumber: "",
    expirydate: "",
    issueddate: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const vehicleOwnerResponse = await axios.get("/api/auth", {
          headers: {
            "x-auth-token": token,
          },
        });
        setVehicleOwner(vehicleOwnerResponse.data);
      } catch (error) {
        console.error("Error fetching vehicle owner details:", error);
      }

      try {
        const profileResponse = await axios.get("/api/profile/me", {
          headers: {
            "x-auth-token": token,
          },
        });
        setProfile(profileResponse.data);
        // Set the updated profile state with existing data
        setUpdatedProfile(profileResponse.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const updateProfile = async () => {
    try {
      const response = await axios.post("/api/profile", updatedProfile, {
        headers: {
          "x-auth-token": token,
        },
      });
      setProfile(response.data);
      navigate("/profile");
      // Reset input fields or perform any other necessary actions
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error as needed
    }
  };

  // Update the state when input fields change
  const handleInputChange = (e, fieldName) => {
    setUpdatedProfile({
      ...updatedProfile,
      [fieldName]: e.target.value,
    });
  };


  return (
    <>
      <Navbar />
      <br />
      <div className="text-center">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900 mt-28 mb-10">
          Update Information
        </h3>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          NIC
        </label>
        <input
          type="text"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.nic}
          onChange={(e) => handleInputChange(e, "nic")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Address
        </label>
        <input
          type="text"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.address}
          onChange={(e) => handleInputChange(e, "address")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          License Number
        </label>
        <input
          type="text"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.licensenumber}
          onChange={(e) => handleInputChange(e, "licensenumber")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Expiry Date
        </label>
        <input
          type="date"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.expirydate}
          onChange={(e) => handleInputChange(e, "expirydate")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Issued Date
        </label>
        <input
          type="date"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.issueddate}
          onChange={(e) => handleInputChange(e, "issueddate")}
        />
      </div>
      <div className="text-center mt-10">
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={updateProfile}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Profile;
