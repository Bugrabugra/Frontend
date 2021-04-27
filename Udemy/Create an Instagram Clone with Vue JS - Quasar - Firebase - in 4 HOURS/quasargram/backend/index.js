const express = require("express");
const admin = require("firebase-admin");
const inspect = require("util").inspect;
const Busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
const UUID = require("uuid-v4");
const webPush = require("web-push");


const app = express();
const port = 3000;

// Config Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "quasagram-497dd.appspot.com/"
})

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Config web-push
webPush.setVapidDetails(
  "mailto:test@test.com",
  "BD3aTofWWx6vje4CnMpyK0oIlXz-Xy9m1ljou1Sbd7vZP3HtlajULG9WdsOcvqg78Z8ja3NXQhPjszaGJ_Tw24s", // public key
  "zw11wGjixS2OoF_HaDVqXnPdDe3IS2wMBEu2AXcrwuQ" // private key
)

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

// Create posts
app.post("/createPost", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  const uuid = UUID();

  const busboy = new Busboy({headers: request.headers});

  let fields = {};
  let fileData = {};

  busboy.on("file", (fieldName, file, filename, encoding, mimeType) => {
    console.log("File [" + fieldName + "]: filename: " + filename + ", encoding: " + encoding + ", mimeType: " + mimeType);
    // Saving to TEMP folder first
    let filePath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filePath))
    fileData = {filePath, mimeType};
  })

  busboy.on("field", (fieldName, val, fieldNameTruncated, valTruncated, encoding, mimeType) => {
    console.log("Field [" + fieldName + "]: value: " + inspect(val));
    fields[fieldName] = val;
  })

  busboy.on("finish", () => {
    bucket.upload(
      fileData.filePath,
      {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (error, uploadedFile) => {
        if (!error) {
          createDocument(uploadedFile);
        }
      }
    )

    const createDocument = (uploadedFile) => {
      db.collection("posts")
        .doc(fields.id)
        .set({
          id: fields.id,
          caption: fields.caption,
          location: fields.location,
          date: parseInt(fields.date),
          imageURL: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`
        })
        .then(() => {
          sendPushNotification();
          response.send("Post added: " + fields.id)
        })
    }

    const sendPushNotification = () => {
      const subscriptions = [];

      db.collection("subscriptions")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            subscriptions.push(doc.data());
          })
          return subscriptions;
        }).then(subscriptions => {
        subscriptions.forEach(subscription => {
          const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
              auth: subscription.keys.auth,
              p256dh: subscription.keys.p256dh
            }
          };

          const pushContent = {
            title: "New Quasagram Post!",
            body: "New Post Added! Check it out!",
            openURL: "/#/"
          }
          const pushContentStringified = JSON.stringify(pushContent);
          webPush.sendNotification(pushSubscription, pushContentStringified)
        })
      })
    }
  })

  request.pipe(busboy);
})

// Create subscription
app.post("/createSubscription", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  db.collection("subscriptions")
    .add(request.query)
    .then(docRef => {
      response.send({
        message: "Subscription added!",
        postData: request.query
      })
    })

  console.log(request)
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
