import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../../Layout/Drawer";
import { deleteInquiry, getAllInquiry } from "../../../api/inquiry";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { InquiryModal } from "./InquiryModal";
import toast, { Toaster } from "react-hot-toast";

const success = () => toast.success("Inquiry Successfully Deleted");
const successFetching = () => toast.success("Inquiries fetched successfully");
const errorNotify = () => toast.error("Something wrong");

const token = localStorage.getItem("token");
console.log("token=>", token);
export const AdminInquiry = () => {
  const token = localStorage.getItem("token");
  // console.log("token=>", token);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [inquiryModal, setInquiryModal] = useState(false);
  const [currentInquiryId, setCurrentInquiryId] = useState(null);
  const [inquiry, setInquiry] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function getStatusClassName(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return ""; // Default case if status doesn't match any case
    }
  }

  const toggleInquiryModal = (inquiry) => {
    // console.log("toglleInqModal");
    setInquiry(inquiry);
    setInquiryModal(!inquiryModal);
  };

  const toggleModal = (id) => {
    setCurrentInquiryId(id);
    setModalOpen(!isModalOpen);
  };

  const handleEditClick = (inquiry) => {
    navigate("/inquiry/update", { state: { inquiry } });
  };

  const handleDeleteInquiries = async (id) => {
    try {
      await deleteInquiry(id, token);
      setInquiries((currentInquiries) =>
        currentInquiries.filter((inquiry) => inquiry._id !== id)
      );
    } catch (error) {
      errorNotify();
      alert(error);
      console.log("error deleting inquiry => ", error);
    }
  };

  const getInquiries = async () => {
    try {
      const res = await getAllInquiry(token);
      // console.log("res=>", res);
      successFetching();
      setInquiries(res);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching inquiries: ", error.message);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      getInquiries();
    }, 300); // Adjust the time based on your needs

    return () => clearTimeout(handler);
  }, []);

  const filteredInquiries = inquiries.filter((inquiry) =>
    inquiry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ResponsiveDrawer>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by status"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-28 shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white :text-white :bg-gray-800">
            All Inquiries
            {/* <p className="mt-1 text-sm font-normal text-gray-500 :text-gray-400">
              Browse a list of tickets designed to help you work and play, stay
              organized, get answers, keep in touch, grow your business, and
              more.
            </p> */}
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiry) => (
                <tr className="bg-white border-b :bg-gray-800 :border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                  >
                    {inquiry.title}
                  </th>
                  <td className="px-6 py-4">{inquiry.description}</td>
                  <td className="px-6 py-4 capitalize">
                    {inquiry.inquiryType}
                  </td>
                  <td className="px-3 py-4">{inquiry.email}</td>
                  <td className="px-3 py-4 capitalize">{inquiry.phone}</td>
                  <td className="px-3 py-4">
                    <span
                      className={`uppercase font-semibold text-[12px] px-2.5 py-0.5 rounded ${getStatusClassName(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px- py-4 text-right">
                    <a
                      onClick={() => toggleInquiryModal(inquiry)}
                      className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                    >
                      <VisibilityIcon />
                    </a>
                  </td>
                  <td className="px- py-4 text-right">
                    <a
                      onClick={() => handleEditClick(inquiry)}
                      className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                    >
                      <EditIcon />
                    </a>
                  </td>
                  <td className="px-3 py-4 text-right">
                    <a
                      onClick={() => toggleModal(inquiry._id)}
                      className="font-medium text-red-600 :text-blue-500 cursor-pointer"
                    >
                      <DeleteIcon />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <div className="w-full text-md text-gray-600 font-semibold m-10 text-center">
                You dont have any tickets!
              </div>
            )}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <br />

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
                  Are you sure you want to delete this inquiry?
                </h3>
                <button
                  onClick={() => {
                    handleDeleteInquiries(currentInquiryId);
                    toggleModal(false);
                    success();
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

      {inquiryModal && (
        <InquiryModal
          inquiry={inquiry}
          toggleInquiryModal={toggleInquiryModal}
        />
      )}

      <Toaster />
    </ResponsiveDrawer>
  );
};
