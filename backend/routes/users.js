//Route file so we need express router
const router = require("express").Router();

//Get the model we are gonna use for this route
let User = require("../models/user.model");

//Create routes

//Read
//baseUrl/users/
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

//Create
//baseUrl/users/add
router.route("/add").post((req,res)=>{
    //get new username from req body
    const username = req.body.username;

    //Create new user using User Schema
    const newUser = new User({username});

    //Create and Insert into mongoDB using Mongo Save() method
    newUser.save()
    .then((user)=> res.json(user))
    .catch(err => res.status(400).json('Error: '+ err));
});

//baseUrl/users/:id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

//Delete
//baseUrl/simulations/:id
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

//Update
//baseUrl/simulations/update/:id
router.route("/update/:id").put((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;

      user
        .save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;