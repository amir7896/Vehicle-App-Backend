const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  color, model, make, registration-no
const vehicleSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    registrationNo: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
