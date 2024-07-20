import API from "../helper/apiHelper";

const createVehicleOwner = async (vehicleOwner) => {
  try {
    const createdVehicleOwner = await new API().post(
      "vehicleOwner",
      vehicleOwner
    );
    return createdVehicleOwner;
  } catch (error) {
    console.error("Error creating vehicle owner:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { createVehicleOwner };
