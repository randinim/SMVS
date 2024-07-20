import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateInquiry } from "../../../api/inquiry";

const token = localStorage.getItem("token");

const UpdateInquiryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inquiry = location.state?.inquiry;
  //   console.log(inquiry);
  const [updateInquiryData, setUpdateInquiryData] = useState({
    phone: inquiry?.phone || "",
    title: inquiry?.title || "",
    description: inquiry?.description || "",
    inquiryType: inquiry?.inquiryType || "",
    inquiryStatus: inquiry?.status || "", // Ensure this matches how you pass status
  });

  const { phone, title, description, inquiryType, inquiryStatus } =
    updateInquiryData;

  const onChange = (e) =>
    setUpdateInquiryData({
      ...updateInquiryData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedInquiry = {
      phone,
      title,
      description,
      inquiryType,
      status: inquiryStatus,
    };
    // console.log(updatedInquiry);
    try {
      await updateInquiry(updatedInquiry, inquiry?._id, token);
      //   success();
      navigate("/admin/inquiries");
    } catch (err) {
      console.log("inquiry updating error => ", err);
      //   errorNotify();
    }
  };

  return (
    <>
      <section className="bg-white :bg-gray-900">
        <div className="px-4 mx-auto max-w-2xl py-9">
          <h2 className="mb-4 text-xl font-bold text-gray-900 :text-white">
            Update inquiry
            <span className="ml-2 text-sm text-gray-400">{inquiry._id}</span>
          </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="flex flex-col gap-4 sm:grid-cols-2 sm:gap-6">
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
                  disabled
                />
              </div>
              <div className="flex w-full gap-5">
                <div className="w-full">
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
                    disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                  >
                    <option selected disabled>
                      Choose type
                    </option>
                    <option value="product">Product</option>
                    <option value="rental">Rental</option>
                    <option value="service">Service</option>
                    <option value="quality_checks">Quality Check</option>
                    <option value="customer_care">Customer Care</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Change status
                  </label>
                  <select
                    name="inquiryStatus"
                    id="status"
                    value={inquiryStatus}
                    onChange={(e) => onChange(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  >
                    <option>Choose a status</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
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
                  disabled
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Description
                </label>
                <textarea
                  disabled
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
            <br />

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg"
              // onClick={notify}
            >
              Update Inquiry
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateInquiryForm;
