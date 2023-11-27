const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  AdditionalNote: {
    type: String,
    // enum: ["Home" , "College" , "Hostel" , "Other"]
  },
  address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Address", addressSchema, "address");
