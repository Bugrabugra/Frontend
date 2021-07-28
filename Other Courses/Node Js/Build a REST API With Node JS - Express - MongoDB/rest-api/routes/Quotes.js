const express = require("express");
const router = express.Router();
const Quote = require("../models/Quotes");


// Get all quotes
router.get("/", async (req, res) => {
  const quotes = await Quote.find();

  res.json(quotes);
});

// Create new quote
router.post("/new", async (req, res) => {
  const newQuote = await new Quote(req.body).save();

  res.json(newQuote);
});

// Get a specific quote
router.get("/get/:id", async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  res.json(quote);
});

// Delete quote
router.get("/delete/:id", async (req, res) => {
  const deletedQuote = await Quote.findByIdAndDelete(req.params.id);

  res.json(deletedQuote);
});

// Update a quote
router.patch("/update/:id", async (req, res) => {
  const updatedQuote = await Quote.findByIdAndUpdate(
    req.params.id,
    req.body,
    {useFindAndModify: false}
  );

  res.json(updatedQuote);
});

// Get random quote
router.get("/random", async (req, res) => {
  const count = await Quote.countDocuments();
  const random = Math.floor(Math.random() * count);
  const quote = await Quote.findOne().skip(random)

  res.json(quote);
});

module.exports = router;