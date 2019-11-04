const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

//Endpoint for getting account by ID
router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "This account ID is invalid" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "We encountered an error while retrieving the account"
      });
    });
});

//Endpoint to delete account
router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(data => {
      if (data) {
        res
          .status(200)
          .json({ message: "The account was successfully deleted" });
      } else {
        res.status(404).json({ message: "This account ID is invalid" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: "We encountered an error while deleting the account"
        });
    });
});
