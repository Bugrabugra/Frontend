const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const axios = require("axios");

const app = express()
app.use(express.json())

const db = new sqlite3.Database("products.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.log(err.message)
  }
  console.log("Connected to the SQL db")

  db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT," +
    " description TEXT, userId STRING)")
})

app.post("/product", async (req, res) => {
  const { userId, name, description } = req.body

  try {
    const userResponse = await axios.get(`http://localhost:3001/user/${userId}`)

    if (!userResponse.data) {
      return res.status(401).send("User not exists")
    }

    db.run("INSERT INTO products (name, description, userId) VALUES (?, ?, ?)", [
      name, description, userId
    ], (err) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.status(201).send({ id: this.lastID })
    })
  } catch(error) {
    res.status(500).send("Error in adding product")
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`)
})
