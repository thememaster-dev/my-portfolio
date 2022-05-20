const mongoose = require("mongoose");

const { Schema } = mongoose;

const OwnerSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    forgetPassOtp: {
      type: String,
    },

    forgetPassOtpExpiry: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Owner", OwnerSchema);
