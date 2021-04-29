/*
 dependencies
 */

const express = require('express');
const admin = require("firebase-admin");
const webPush = require("web-push");

/*
 config - express
 */

const app = express()

/*
 config - firebase
 */

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore()

/*
 endpoint - tasks
 */

app.get('/tasks', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  const tasks = []

  db.collection('tasks').orderBy('id', 'asc').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      tasks.push(doc.data())
    });
    response.send(tasks);
  })
})

/*
 endpoint - createTask
 */

app.post('/createTask', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  request.query.id = parseInt(request.query.id)
  db.collection('tasks')
    .add(request.query)
    .then(docRef => {
      sendPushNotification();
      response.send(request.query)
    })
});

const sendPushNotification = () => {
  const subscriptions = []

  db.collection('subscriptions')
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        tasks.push(doc.data())
      });
      return subscriptions;
    }).then(subscriptions => {
    subscriptions.forEach(subscription => {
      const pushConfig = {
        endpoint: subscription.endpoint,
        keys: {
          auth: subscription.keys.auth,
          p256dh: subscription.keys.p256dh
        }
      }

      const pushContent = {
        title: "New task added!"
      }

      webPush.sendNotification(pushConfig, JSON.stringify(pushContent))
    })
  })
}

app.post('/createSubscription', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  request.query.id = parseInt(request.query.id)
  db.collection('subscriptions')
    .add(request.query)
    .then(docRef => {
      response.send({
        message: "Subscription added!",
        data: request.query
      })
    })
});

// config - web push
webPush.setVapidDetails("mailto:test@test.com", "BMsXRZRzoE9GGo3uHw__aIUNuqBXusySttthTqIYpcytfxncLpudvhVzU_hYRTYgqjQzMoirpiJp_wsrZuQ1NhA", "5M49siqeEcbZS6h_rfMn2ME1vjqU8BcmlTh4hzZva14")

/*
 launch server
 */

app.listen(3000)
