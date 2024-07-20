const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleOwner",
  },

  nic: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  licensenumber: {
    type: String,
    required: true,
  },
  expirydate: {
    type: Date,
    required: true,
  },
  issueddate: {
    type: Date,
    required: true,
  },

  vehicle: [
    {
      make: {
        type: String,
      },
      model: {
        type: String,
      },
      year: {
        type: String,
      },
      registrationnumber: {
        type: String,
      },
      fueltype: {
        type: String,
      },
      dailyusage: {
        type: String,
      },
      //Vehicle License

      licensenumber: {
        type: String,
      },
      licenseissued: {
        type: Date,
      },
      licenseexpiry: {
        type: Date,
      },

      //Vehicle Insurance

      insurancenumber: {
        type: String,
      },
      insurancetype: {
        type: String,
      },
      expirydate: {
        type: Date,
      },
      issueddate: {
        type: Date,
      },
    },
  ],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
