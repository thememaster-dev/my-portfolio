const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
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
    },
    activeStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    forgetPassOtp: {
      type: String,
    },

    forgetPassOtpExpiry: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "editor", "visitor"],
    },
    powerField: {
      type: [String],
      default: ["project", "board"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
