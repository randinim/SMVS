import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import ApiHelper from "../../helper/apiHelper";

const apiHelper = new ApiHelper();
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const user = await login(formData);
    // Checking for specific admin credentials
    if (
      user &&
      formData.email === "admin2024@gmail.com" &&
      formData.password === "admin2024"
    ) {
      localStorage.setItem("token", user.token);
      navigate("/admin"); // Navigating to admin page
    } else if (user) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.userId);
      navigate("/profile"); // Navigating to profile page for other users
    }
    console.log(user);
    // console.log("user=>", user);
    localStorage.setItem("userId", user.userId);

    if (user) {
      localStorage.setItem("token", user.token);

      const userProfile = await getUserProfile(user.token);
      if (!userProfile) {
        navigate("/CreateProfile");
      } else {
        if (
          formData.email === "admin2024@gmail.com" &&
          formData.password === "admin2024"
        ) {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      }
    }
  };

  const getUserProfile = async (token) => {
    try {
      const profile = await apiHelper.get("profile/me", {}, token);
      // console.log("profile=>", profile);
      return profile;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
  }, [navigate]);

  return (
    <>
      <section className="bg-gray-50 :bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => onSubmit(e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    onChange={(e) => onChange(e)}
                    value={email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    required
                    onChange={(e) => onChange(e)}
                    value={password}
                    minLength="6"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary :bg-[#0C359E] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 :text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline :text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
