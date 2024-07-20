import React, { useState } from "react";
import axios from "axios";

function ReportForm() {
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");
  const [comments, setComments] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error messages
  const [successMessage, setSuccessMessage] = useState(null); // Track success message

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "creator":
        setCreator(value);
        break;
      case "comments":
        setComments(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to indicate ongoing request
    setError(null); // Clear any previous errors
    setSuccessMessage(null); // Clear any previous success message

    const formData = new FormData();
    formData.append("name", name);
    formData.append("creator", creator);
    formData.append("comments", comments);
    formData.append("pdf", selectedFile);

    try {
      const response = await axios.post("/reports", formData); // Send POST request
      setIsLoading(false); // Clear loading state
      setSuccessMessage("Report created successfully!"); // Set success message
      setName(""); // Clear form fields after successful submission (optional)
      setCreator("");
      setComments("");
      setSelectedFile(null);
    } catch (error) {
      setIsLoading(false); // Clear loading state
      setError("Error creating report: " + error.message); // Set error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for name, creator, comments, and file upload */}
      {isLoading && <p>Submitting report...</p>} {/* Display loading message */}
      {error && <p className="error">{error}</p>} {/* Display error message */}
      {successMessage && <p className="success">{successMessage}</p>}{" "}
      {/* Display success message */}
      <button type="submit" disabled={isLoading}>
        Submit Report
      </button>
    </form>
  );
}

export default ReportForm;
