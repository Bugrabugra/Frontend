const express = require("express");
const app = express();

const middleware1 = (req, res, next) => {
  req.customProperty = 100;
  next(); // you have to run this code to continue!
}

const middleware2 = (req, res, next) => {
  console.log("The custom property value is: ", req.customProperty);
  req.customProperty = 600;
  next(); // you have to run this code to continue!
}

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.send("<h1>There was an error, please try again</h1>")
  }
}

const standardExpressCallback = (requestObject, responseObject, nextMiddleware) => {
  console.log("I'm the standard Express function");
  responseObject.send("<h1>Hello world</h1>");
}

app.use(middleware1);
app.use(middleware2);

app.get("/", (req, res, next) => {
  res.send(`<h1>The value is: ${req.customProperty} </h1>`);
})

app.use(errorHandler);

app.listen(3000);