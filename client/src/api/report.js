// import API from "../helper/apiHelper";

// const createVehicleOwner = async (vehicleOwner) => {
//   try {
//     const createdVehicleOwner = await new API().post(
//       "vehicleOwner",
//       vehicleOwner
//     );
//     return createdVehicleOwner;
//   } catch (error) {
//     console.error("Error creating vehicle owner:", error.message);
//     throw error; // Rethrow the error for the component to handle
//   }
// };

// export { createVehicleOwner };

import API from "../helper/apiHelper";

const getAllReports = async () => {
  try {
    const reports = await new API().get("report/all"); // Assuming endpoint for all owners is "vehicleOwners"
    return reports; // Assuming the response data contains the list of vehicle owners
  } catch (error) {
    console.error("Error fetching reports:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { getAllReports };
