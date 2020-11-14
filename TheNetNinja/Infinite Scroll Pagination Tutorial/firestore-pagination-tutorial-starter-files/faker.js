// import firebase from "firebase";
const faker = require('faker');
const firebase = require("firebase");


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARHfmyxPlzVvV53DevV4DS0LfPeh2uENE",
  authDomain: "ninja-pagination-scroll.firebaseapp.com",
  databaseURL: "https://ninja-pagination-scroll.firebaseio.com",
  projectId: "ninja-pagination-scroll",
  storageBucket: "ninja-pagination-scroll.appspot.com",
  messagingSenderId: "943891152405",
  appId: "1:943891152405:web:a114d528846043b3f2d81c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

for (let i = 0; i < 30; i++) {
  console.log(i)
  db.collection("reviews").add({
    author: faker.name.findName(),
    createdAt: faker.date.past(),
    rating: Math.ceil(Math.random() * 5),
    title: faker.commerce.productName()
  })
}

