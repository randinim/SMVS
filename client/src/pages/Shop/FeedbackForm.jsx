import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { addFeedback } from "../../api/product";
import Rating from "@mui/material/Rating";

const success = () => toast.success("Feedback successfully submitted");
const errorNotify = () => toast.error("Something went wrong!");

export const FeedbackForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  //   console.log(product._id);

  const [feedbackData, setFeedbackData] = useState({
    email: "",
    userName: "",
    comment: "",
    rating: "",
  });

  const { email, userName, comment, rating } = feedbackData;

  const onChange = (e) =>
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log("inquiryData => ", inquiryData);
    const newFeedback = {
      email,
      userName,
      comment,
      rating,
    };

    console.log("feedback=> ", newFeedback);

    try {
      await addFeedback(newFeedback, product._id);
      success();
      // console.log("newInquiry=> ", newInquiry);

      // Delay navigation for 2 seconds after showing success
      setTimeout(() => {
        navigate("/shop");
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
            Add Feedback
          </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="flex flex-col gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="flex flex-col w-full gap-3">
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
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={userName}
                    onChange={(e) => onChange(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Ratings
                </label>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(e) => onChange(e)}
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
                  id="description"
                  rows="8"
                  name="comment"
                  value={comment}
                  required
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
