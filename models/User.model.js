const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"]
  },
  dob: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cityOrDistrict: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true
  },
}, {timestamps: true});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);