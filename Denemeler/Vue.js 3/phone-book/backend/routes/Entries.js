const express = require("express");
const Entry = require("../models/Entry");
const router = express.Router();


// Get all entries
router.get("/all", async (req, res) => {
  const allEntries = await Entry
    .find()
    .then(response => res.json(response))
    .catch(error => console.log(error));
});

// Create entry
router.post("/create", async (req, res) => {
  const body = req.body;
  const newEntry = await new Entry(body)
    .save()
    .then(response => res.send(response))
    .catch(error => console.log(error));
});

// Update and entry
router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const updatedEntry = await Entry
    .findByIdAndUpdate(
      id,
      update,
      {useFindAndModify: false}
    )
    .then(response => res.send(response))
    .catch(error => console.log(error));
})

// Delete an entry
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const deletedEntry = await Entry
    .findByIdAndDelete(id)
    .then(response => res.send(response))
    .catch(error => console.log(error));
});

module.exports = router;