//require mongoose
const mongoose = require("mongoose");

//Get schema from mongoose Schema
const Schema = mongoose.Schema;

//Create schema (JSON)
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    }
  },
  {
    timestamps: true
  }
);


// Creating schema into a const to export
const User = mongoose.model('User', userSchema);

module.exports = User;