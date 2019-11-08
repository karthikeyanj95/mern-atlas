//require mongoose
const mongoose = require("mongoose");

//Get schema from mongoose Schema
const Schema = mongoose.Schema;

//Create schema (JSON)
const simulationSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    values: { type: Array, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

// Creating schema into a const to export
const Simulation = mongoose.model("Simulation", simulationSchema);

module.exports = Simulation;
