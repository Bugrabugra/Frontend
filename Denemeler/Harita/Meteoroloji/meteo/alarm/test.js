const crypto = require("crypto-js");
const axios = require("axios");

const apiURI = "https://api.fieldclimate.com/v2";
const apiRoute = "/data/00204B88/41/last/1h";
const public_key = "7cc7e535ea8575a4fec0f9c8196592b6a0b72f2228f418d9";
const private_key = "1ca56e5a59418563fc4c6b3b3fd6ef4f1795ce85c78b46b0";
const method = "GET";

const now = new Date();
const utcDate = now.toUTCString();
console.log("UTC Date: ", utcDate);

const msg = method + apiRoute + utcDate + public_key
console.log("Msg: ", msg);

const h = crypto.HmacSHA256(msg, private_key).toString(crypto.enc.HEX);
console.log("Hash: ", h);


axios
  .get(
    apiURI + apiRoute,
    {
      headers: {
        "Date": utcDate,
        'Authorization': "hmac " + public_key + ":" + h
      }}
  )
  .then(response => {
    const data = response.data;
    data.data.forEach(d => {
      console.log(d);
    })
  })
  .catch(error => console.log(error));

