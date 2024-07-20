import React, { useState } from "react";
import mc from "../assets/mastercard.png";
import visa from "../assets/visa.png";
import axios from "axios";
import { Link } from "react-router-dom";

const CreditCard = ({ card, refersher }) => {
  const [confirmDelete, setConfirmDelete] = useState(false); // State to track confirmation dialog

  // Function to determine card type based on the first four digits
  const getCardType = (cardNumber) => {
    const firstFourDigits = cardNumber.substring(0, 4);
    if (firstFourDigits.startsWith("4")) {
      return "visa";
    } else if (
      firstFourDigits.startsWith("51") ||
      firstFourDigits.startsWith("52") ||
      firstFourDigits.startsWith("53") ||
      firstFourDigits.startsWith("54") ||
      firstFourDigits.startsWith("55")
    ) {
      return "mastercard";
    } else {
      return "unknown";
    }
  };

  // Determine card type
  const cardType = getCardType(card.cardNumber);

  const deleteCard = async () => {
    try {
      // Send a DELETE request to the server to delete the card
      await axios.delete(`/api/cards/${card._id}`);
      refersher();
    } catch (err) {
      console.error("Error deleting card:", err);
    }
  };

  const handleDeleteConfirmation = () => {
    setConfirmDelete(true); // Show confirmation dialog
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false); // Hide confirmation dialog
  };

  const handleConfirmDelete = () => {
    deleteCard(); // Delete the card
    setConfirmDelete(false); // Hide confirmation dialog
  };

  return (
    <div className="max-w-full px-3 md:w-1/2 md:flex-none">
      <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none md-max:overflow-auto rounded-xl border-slate-100 dark:border-slate-700 bg-clip-border">
        <img
          className="mb-0 mr-4 w-1/10 h-10"
          src={cardType === "visa" ? visa : mc}
          alt="logo"
        />
        <h6 className="mb-0 dak:text-white">
          ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;
          {card.cardNumber.substring(12)}
        </h6>

        <div className="ml-auto">
          <Link
            className="mr-2 text-sm text-slate-700 hover:text-slate-900 focus:outline-none"
            to={`/profile/card/${card._id}`}
          >
            <i className="fas fa-trash"></i> Edit
          </Link>
          <button
            className="mr-2 text-sm text-red-400 hover:text-slate-900 focus:outline-none"
            onClick={handleDeleteConfirmation} // Attach handleDeleteConfirmation function to onClick event
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
        {/* Confirmation dialog */}
        {confirmDelete && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-black opacity-50"></div>
              </div>
              <div className="relative z-10 p-6 bg-white shadow-md rounded-xl">
                <p className="mb-4">
                  Are you sure you want to delete this card?
                </p>
                <div className="flex justify-center">
                  <button
                    className="mr-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                    onClick={handleConfirmDelete} // Attach handleConfirmDelete function to onClick event
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                    onClick={handleCancelDelete} // Attach handleCancelDelete function to onClick event
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCard;
