const express = require("express");
const admin = require('firebase-admin');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const serviceAccount = require("./privateKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get("/tasks", (request, response) => {
  const tasks = []

  db.collection("tasks")
    .orderBy("id", "asc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        tasks.push(doc.data())
      })
      response.send(tasks);
    })
})

app.post("/createTask", (request, response) => {
  const task = request.body;

  db.collection("tasks")
    .add(task)
    .then(response => {
      console.log(response);
    })
})

app.listen(port);
