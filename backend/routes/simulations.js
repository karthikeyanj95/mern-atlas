//Route file so we need express router
const router = require("express").Router();

//Get the model we are gonna use for this route
let Simulation = require("../models/simulation.model");

//Create routes

//Read
//baseUrl/simulations/
router.route("/").get((req, res) => {
  Simulation.find()
    .then(simulations => res.json(simulations))
    .catch(err => res.status(400).json("Error: " + err));
});

//Create
//baseUrl/simulations/add
router.route("/add").post((req, res) => {
  //get new username from req body
  const username = req.body.username;
  const description = req.body.description;
  const values = req.body.values.split(",").map(Number);
  const date = Date.parse(req.body.date);

  //Create new user using User Schema
  const newSimulation = new Simulation({
    username,
    description,
    values,
    date
  });

  //Create and Insert into mongoDB using Mongo Save() method
  newSimulation
    .save()
    .then(simulation => res.json(simulation))
    .catch(err => res.status(400).json("Error: " + err));
});

//baseUrl/simulations/:id
router.route("/:id").get((req, res) => {
  Simulation.findById(req.params.id)
    .then(simulation => res.json(simulation))
    .catch(err => res.status(400).json("Error: " + err));
});

//Delete
//baseUrl/simulations/:id
router.route("/:id").delete((req, res) => {
  Simulation.findByIdAndDelete(req.params.id)
    .then(simulation => res.json(simulation))
    .catch(err => res.status(400).json("Error: " + err));
});

//Update
//baseUrl/simulations/update/:id
router.route("/update/:id").put((req, res) => {
  Simulation.findById(req.params.id)
    .then(simulation => {
      simulation.username = req.body.username;
      simulation.description = req.body.description;
      simulation.values = req.body.values.split(",").map(Number);
      simulation.date = Date.parse(req.body.date);

      simulation
        .save()
        .then(simulation => res.json(simulation))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
