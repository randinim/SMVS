import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { createInquiry } from "../../api/inquiry";

const success = () => toast.success("Inquiry Successfully Added");
const errorNotify = () => toast.error("Something wrong");
const token = localStorage.getItem("token");
// console.log("token => ", token);

const Inquiries = () => {
  const navigate = useNavigate();
  const [inquiryData, setInquiryData] = useState({
    email: "",
    phone: "",
    title: "",
    description: "",
    inquiryType: "",
  });

  const { email, phone, title, description, inquiryType } = inquiryData;

  const onChange = (e) =>
    setInquiryData({ ...inquiryData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log("inquiryData => ", inquiryData);
    const newInquiry = {
      email,
      phone,
      title,
      description,
      inquiryType,
    };

    try {
      await createInquiry(newInquiry);
      success();
      // console.log("newInquiry=> ", newInquiry);

      // Delay navigation for 2 seconds after showing success
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      alert(err);
      console.log("inquiry creating error => ", err);
      errorNotify();
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-white :bg-gray-900">
        <div className="px-4 mx-auto max-w-2xl py-32">
          <h2 className="mb-4 text-xl font-bold text-gray-900 :text-white">
            Make an new inquiry
          </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="flex flex-col gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="flex w-full gap-3">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => onChange(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                    placeholder="Enter phone number"
                    required
                    maxLength="10"
                    minLength="10"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Inquiry Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                  placeholder="Type inquiry title"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Inquiry type
                </label>
                <select
                  name="inquiryType"
                  value={inquiryType}
                  onChange={(e) => onChange(e)}
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                >
                  <option selected>Choose type</option>
                  <option value="product">Product</option>
                  <option value="rental">Rental</option>
                  <option value="service">Service</option>
                  <option value="quality_checks">Quality Check</option>
                  <option value="customer_care">Customer Care</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg"
              // onClick={notify}
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default Inquiries;
