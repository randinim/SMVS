import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAfter";
import axios from "axios";
import CreateProfile from "./CreateProfile";
import { Link } from "react-router-dom";
import CreditCard from "../../components/CreditCard";

const token = localStorage.getItem("token");
const userID = localStorage.getItem("userId");

const Profile = () => {
  const [vehicleOwner, setVehicleOwner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  // State to hold remaining time

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const getCards = async () => {
    console.log("userID=>", userID);

    try {
      const res = await axios.get(
        "/api/cards/user/" + localStorage.getItem("userId")
      );
      console.log(res);
      // console.log(res);
      setCards(res.data?.cards);
    } catch (err) {
      console.error("Error fetching cards");
    }
  };

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
        // Calculate remaining time when profile data is fetched
        calculateRemainingTime(profileResponse.data.expirydate);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    if (token) {
      fetchUserData();
      getCards();
    }
  }, [token]);

  // Function to calculate remaining time
  const calculateRemainingTime = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const difference = expiry.getTime() - now.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    setRemainingTime(days);
  };

  const deleteProfile = async () => {
    try {
      const response = await axios.delete("/api/profile", {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(response.data);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error deleting profile:", error);
      // Handle error as needed
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getCards();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-20 ">
        <div className="text-center">
          <h3 className=" text-3xl font-semibold leading-7 text-gray-900 mt-12 mb-20">
            Vehicle Owner Information
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100 ">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {vehicleOwner && vehicleOwner.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {vehicleOwner && vehicleOwner.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {vehicleOwner && vehicleOwner.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Date registered
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {vehicleOwner &&
                  new Date(vehicleOwner.date).toLocaleDateString()}
              </dd>
            </div>
            {/* Remaining Time */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Remaining Time (days) to Expiry
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {remainingTime !== null ? remainingTime : "Loading..."}
              </dd>
            </div>
          </dl>
        </div>

        {profile && (
          <>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                NIC
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {profile.nic}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {profile.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                License Number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {profile.licensenumber}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Expiry Date
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(profile.expirydate).toLocaleDateString()}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Issued Date
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(profile.issueddate).toLocaleDateString()}
              </dd>
            </div>
          </>
        )}
        <div className="flex flex-col items-center mt-6 space-y-4">
          <Link to="/UpdateProfile">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update Profile
            </button>
          </Link>
          <Link to="/ShowVehicle">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Show Vehicle
            </button>
          </Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={deleteProfile}
          >
            Delete Profile
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}
          >
            LogOut
          </button>
        </div>
      </div>
      <div className="flex w-full justify-end px-3 mb-6 lg:mb-0">
        <div className=" flex flex-col min-w-0 mt-6 break-words bg-white border-0 border-transparent border-solid shadow-xl :bg-slate-850 :shadow--xl rounded-2xl bg-clip-border">
          <div className="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <div className="flex flex-wrap -mx-3">
              <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                <h6 className="mb-0 dar:text-white">Payment Method</h6>
              </div>
              <div className="flex-none w-1/2 max-w-full px-3 text-right">
                <a
                  className="inline-block px-5 py-2.5 font-bold leading-normal text-center text-white align-middle transition-all bg-transparent rounded-lg cursor-pointer text-sm ease-in shadow-md bg-150 bg-gradient-to-tl from-zinc-800 to-zinc-700 :bg-gradient-to-tl :from-slate-750 :to-gray-850 hover:shadow-xs active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25"
                  href="javascript:;"
                  style={{ marginRight: 8 }}
                >
                  {" "}
                  {/* <i className="fas fa-plus"> </i>&nbsp;&nbsp;Add New Card */}
                  <Link to="/profile/cart">My Cart</Link>
                </a>
                <a
                  className="inline-block px-5 py-2.5 font-bold leading-normal text-center text-white align-middle transition-all bg-transparent rounded-lg cursor-pointer text-sm ease-in shadow-md bg-150 bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 hover:shadow-xs active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25"
                  href="javascript:;"
                >
                  {" "}
                  {/* <i className="fas fa-plus"> </i>&nbsp;&nbsp;Add New Card */}
                  <Link to="/profile/card">Add New Card</Link>
                </a>
              </div>
            </div>
          </div>
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              {cards.map((card) => (
                <CreditCard card={card} key={card?.id} refersher={getCards} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
