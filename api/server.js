// BUILD YOUR SERVER HERE\
const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

// A GET request to fetch all of the users
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      if (!users) {
        return res
          .status(500)
          .json({ message: "The users information could not be retrieved" });
      }
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// A GET request to fetch a single user by ID
server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  }
  User.insert(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});



module.exports = server; // EXPORT YOUR SERVER instead of {}
