const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser'); Its included in new express version automatically

//Environmental variables
require("dotenv").config();

//Setting up Node js Server - Express
const app = express();
const port = process.env.PORT || 5000;

//Middleware settings - CORS and JSON
app.use(cors());
app.use(express.json()); // Use bodyParser.json() if needed

//MongoDB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

//Set router to use for models
const simulationRouter = require('./routes/simulations');
const userRouter = require('./routes/users');

//set the express routes
app.use('/simulations', simulationRouter);
app.use('/users', userRouter);

//Create mongoose models for the next step into seperate "models" folder

// Port listening
app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
