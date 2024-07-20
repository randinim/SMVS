import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "../../Layout/Drawer";
import { deleteFeedback, getAllProducts } from "../../../api/product";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const AdminFeedback = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [productId, setProductId] = useState();
  const [currentFeedbackId, setCurrentFeedbackId] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getAllProducts();
        // console.log("res=>", res);
        // successFetching();
        setProducts(res);
      } catch (error) {
        alert(error.message);
        console.error("Error fetching inquiries: ", error.message);
      }
    };

    getProducts();
    // getCards();
  }, []);

  const toggleModal = (PID, FB_id) => {
    setProductId(PID);
    setCurrentFeedbackId(FB_id);
    setModalOpen(!isModalOpen);
  };

  const handleDeleteFeedback = async (pID, fb_ID) => {
    try {
      // Assume deleteFeedback sends a request to your server to delete the feedback
      await deleteFeedback(pID, fb_ID);

      setProducts((currentProducts) =>
        currentProducts.map((product) => {
          if (product._id === pID) {
            // Filter out the feedback to be deleted
            const updatedFeedbacks = product.feedback.filter(
              (fb) => fb._id !== fb_ID
            );
            return { ...product, feedback: updatedFeedbacks };
          }
          return product; // Return other products unchanged
        })
      );
    } catch (error) {
      // Handle error notifications appropriately
      alert(error);
      console.log("error deleting feedback => ", error);
    }
  };

  return (
    <ResponsiveDrawer>
      <div className="mb-28 shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white :text-white :bg-gray-800">
            All Feedbacks
            {/* <p className="mt-1 text-sm font-normal text-gray-500 :text-gray-400">
        Browse a list of tickets designed to help you work and play, stay
        organized, get answers, keep in touch, grow your business, and
        more.
      </p> */}
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Status
              </th> */}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) =>
                product.feedback.map((fb, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b :bg-gray-800 :border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{fb.comment}</td>
                    <td className="px-6 py-4 capitalize">{fb.rating}</td>
                    <td className="px-6 py-4">{fb.email}</td>
                    <td className="px-6 py-4">{fb.date}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        onClick={() => toggleModal(product._id, fb._id)}
                        className="font-medium text-red-600 :text-blue-500 cursor-pointer"
                      >
                        <DeleteIcon />
                      </a>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <div className="w-full text-md text-gray-600 font-semibold m-10 text-center">
                You dont have any feedbacks!
              </div>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-end w-full h-[calc(100%-1rem)]"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-gray-100 rounded-lg shadow-lg :bg-gray-700">
              <button
                onClick={toggleModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center :hover:bg-gray-600 :hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 :text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 :text-gray-400">
                  Are you sure you want to delete this feedback?
                </h3>
                <button
                  onClick={() => {
                    handleDeleteFeedback(productId, currentFeedbackId);
                    toggleModal(false);
                    // success();
                  }}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 :focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={toggleModal}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 :focus:ring-gray-700 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:text-white :hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ResponsiveDrawer>
  );
};
