import API from "../helper/apiHelper";

const addFeedback = async (feedback, pid) => {
  //   console.log("inquiry.js =>", inquiry);
  try {
    const createdFeedback = await new API().put(
      `products/feedback/${pid}`,
      feedback
    );
    return createdFeedback;
  } catch (error) {
    console.error("Error creating feedback:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getAllProducts = async () => {
  try {
    const products = await new API().get("products");
    // console.log("productsINjs => ", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const deleteFeedback = async (pID, fbID) => {
  try {
    const deletedFeedback = await new API().delete(
      `products/feedback/${pID}/${fbID}`
    );
    console.log("deletedFeedback => ", deletedFeedback);
    return deletedFeedback.data;
  } catch (error) {
    console.error("Error deleting Feedback:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { addFeedback, getAllProducts, deleteFeedback };
