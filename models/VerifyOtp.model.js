var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var structure = new Schema({
  phoneNumber: Number,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('VerifyOtp', structure, 'VerifyOtp');
