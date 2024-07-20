import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import moment from "moment";
import FeedbackIcon from "@mui/icons-material/Feedback";

function formatDate(dateString) {
  return moment(dateString).format("dddd, MMMM Do YYYY, h:mm:ss A"); // "Saturday, April 28th 2024, 10:29:19 am"
}

function Shop() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const url = "http://localhost:5000";
  const [token, setToken] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(url + "/api/products");
      setProducts(response.data);
      // console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const addToCart = async (product) => {
    if (!token) {
      console.error("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/cart`,
        {
          userId: localStorage.getItem("userId"),
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Added to cart:", response.data);
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchProducts();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const handleAddFeedback = (product) => {
    navigate("/shop/feedback", { state: { product } });
  };

  return (
    <div>
      <Navbar />
      <section className="bg-white py-8 antialiased light:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="hidden xl:mt-8 xl:block">
                <h3 className="text-2xl font-semibold text-gray-900 :text-white">
                  Shop
                </h3>

                <div className="grid grid-cols-2 gap-4 sm:mt-8">
                  {products &&
                    products.map((product) => (
                      <div
                        key={product.id}
                        className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm light:border-gray-700 light:bg-gray-800"
                      >
                        <div>
                          <a
                            href="#"
                            className="text-lg font-semibold leading-tight text-gray-900 hover:underline :text-white"
                          >
                            {product.name}
                            <p className="mt-2 text-base font-normal text-gray-500 :text-gray-400">
                              {product.brand}
                            </p>
                            <p className="mt-2 text-base font-normal text-gray-500 :text-gray-400">
                              {product.model}
                            </p>
                          </a>
                        </div>

                        <div>
                          <p className="text-lg font-bold text-gray-900 :text-white">
                            Rs. {product.price}
                          </p>
                        </div>
                        <div className="mt-6 flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => addToCart(product)}
                            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800"
                          >
                            <svg
                              className="-ms-2 me-2 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                              />
                            </svg>
                            Add to cart
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddFeedback(product)}
                            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800"
                          >
                            <div className="mr-2">
                              <FeedbackIcon fontSize="small" />
                            </div>
                            Add Feedback
                          </button>
                        </div>
                        <h1 className="font-bold text-lg">Ratings & Reviews</h1>
                        {product.feedback && product.feedback.length > 0 ? (
                          product.feedback.map((fb, index) => (
                            <article key={index}>
                              <div className="flex gap-2 items-center mb-3">
                                <AccountCircleIcon className="text-primary" />
                                <div className="font-medium">
                                  <p>{fb.userName}</p>
                                </div>
                              </div>
                              <div className="flex gap-2 mb-3">
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={fb.rating}
                                  precision={0.5}
                                  readOnly
                                />
                                <p>
                                  <span className="font-bold">{fb.rating}</span>{" "}
                                  out of 5
                                </p>
                              </div>
                              <footer className="mb-3 text-sm text-gray-500 :text-gray-400">
                                <p>Reviewed on {formatDate(fb.date)}</p>
                              </footer>
                              <p className="mb-2 text-gray-500 :text-gray-400">
                                {fb.comment}
                              </p>
                              <Divider />
                            </article>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 :text-gray-400">
                            No feedback available yet.
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Shop;
