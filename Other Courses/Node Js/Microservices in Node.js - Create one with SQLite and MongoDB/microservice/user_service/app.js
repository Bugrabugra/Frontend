const express = require("express");
const mongoose = require("mongoose");

const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/microservice", {
  useNewUrlParser: true
})

const userSchema = new mongoose.Schema({
  username: String,
  password: String
})

const User = mongoose.model("User", userSchema)

app.post("/user", async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password })
  try {
    await user.save()
    res.status(201).send(user)
  } catch(error) {
    res.status(500).send(error.message)
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password })

    if (!user) {
      return res.status(404).send("User not found")
    }
    res.send({ message: "User logged in" })
  } catch(error) {
    res.status(500).send(error.message)
  }
})

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).send("User not found")
    }

    res.send(user)
  } catch(error) {
    res.status(500).send(error.message)
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`)
})
