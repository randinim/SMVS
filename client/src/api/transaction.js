import API from "../helper/apiHelper";

const getAllInvoices = async (token) => {
  try {
    const invoices = await new API().get("invoices", {});
    return invoices;
  } catch (error) {
    console.error("Error fetching invoices:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { getAllInvoices };
