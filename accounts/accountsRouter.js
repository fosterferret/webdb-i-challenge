const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

//Endpoint for getting all accounts
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
      res.status(500).json({
        message: "We encountered an error while deleting the account"
      });
    });
});

//Endpointing for updating an account
router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(data => {
      if (data) {
        res.status(200).json({ message: "The account was updated" });
      } else {
        res.status(404).json({ message: "The account ID is invalid" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "We encountered an error updating the account" });
    });
});

//Endpoint for posting new account
router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body)
    .then(ids => {
      res.status(201).json({ account: ids[0] });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "We encountered an error creating the account" });
    });
});
