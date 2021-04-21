const express = require("express");
const admin = require("firebase-admin");
const app = express();
const inspect = require("util").inspect;
const Busboy = require("busboy");
const port = 3000;


const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

// Get posts
app.get("/posts", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let posts = [];

  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        posts.push(doc.data())
      })
      response.send(posts);
    })
})

// Post posts
app.post("/createPost", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const busboy = new Busboy({headers: request.headers});

  let fields = {}

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log("File [" + fieldname + "]: filename: " + filename + ", encoding: " + encoding + ", mimetype: " + mimetype);
    file.on("data", data => {
      console.log("File [" + fieldname + "] got " + data.length + " bytes");
    })

    file.on("end", () => {
      console.log("File [" + fieldname + "] Finished");
    })
  })

  busboy.on("field", (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
    console.log("Field [" + fieldname + "]: value: " + inspect(val));
    fields[fieldname] = val;
  })

  busboy.on("finish", () => {
    db.collection("posts")
      .doc(fields.id)
      .set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageURL: "https://firebasestorage.googleapis.com/v0/b/quasagram-497dd.appspot.com/o/5tUZBEy.jpg?alt=media&token=e36a1853-bab4-48fa-b25f-9e9783b1b79c"
      })
    // response.writeHead(303, {Connection: "close", Location: "/"});
    response.send("Done parsing form!");
  })

  request.pipe(busboy);
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
