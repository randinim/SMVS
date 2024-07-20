import API from "../helper/apiHelper";

const login = async (userCredentials) => {
  try {
    const user = await new API().post("auth", userCredentials);
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { login };
