import axios from "axios";

class ApiHelper {
  constructor() {
    this.baseUrl = "http://localhost:5000/api";
  }

  async get(endpoint, queryParams = {}, token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        // Other headers can be added here
      };
      if (token) {
        headers["x-auth-token"] = token;
      }
      const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
        params: queryParams,
        headers,
      });

      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async post(endpoint, data, token) {
    // console.log("endpoint =>", endpoint);
    // console.log("data =>", data);
    // console.log("token =>", token);
    try {
      const headers = {
        "Content-Type": "application/json",
        // Other headers can be added here
      };
      if (token) {
        headers["x-auth-token"] = token;
      }

      const response = await axios.post(`${this.baseUrl}/${endpoint}`, data, {
        headers,
      });
      
      localStorage.setItem("userId", response.data.userID);
      //   console.log("response=>", response);
      localStorage.setItem("userId", response.data.userID);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async put(endpoint, data, token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        // Other headers can be added here
      };
      if (token) {
        headers["x-auth-token"] = token;
      }

      const response = await axios.put(`${this.baseUrl}/${endpoint}`, data, {
        headers,
      });
      //   console.log("response=>", response);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async delete(endpoint, token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        // Other headers can be added here
      };
      if (token) {
        headers["x-auth-token"] = token;
      }
      const response = await axios.delete(`${this.baseUrl}/${endpoint}`, {
        headers,
      });

      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  handleAxiosError(error) {
    // This will hold the final error message
    let errorMessage;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data.errors && error.response.data.errors.length > 0) {
        // If there are multiple error messages, join them into a single string
        errorMessage = error.response.data.errors.map((e) => e.msg).join(", ");
      } else {
        // Fallback in case there is a different error structure
        errorMessage = error.response.data.message || "An error occurred";
      }

      // Throw an error with the joined message
      throw new Error(`Server responded with error: ${errorMessage}`);
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response received from the server";
      throw new Error(errorMessage);
    } else {
      // Something happened in setting up the request that triggered an error
      errorMessage = `Error setting up the request: ${error.message}`;
      throw new Error(errorMessage);
    }
  }
}

export default ApiHelper;
