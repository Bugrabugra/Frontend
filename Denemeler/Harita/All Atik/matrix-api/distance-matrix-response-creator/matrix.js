const axios = require("axios");

const apiKey = "AIzaSyBJAq1ZNlFd9sotXqrpPyrAo0wAQKDcQeU"

let containersCoordinateList = "";
const municipalityCenterCoordinates = "40.9828807765619,29.116861107227084|";
const disposalAreaCoordinates = "40.97841698244163,29.13004295270447|";
containersCoordinateList += municipalityCenterCoordinates;

axios.get("http://localhost:3000/containers")
  .then(response => {
    response.data.forEach(container => {
      console.log(container.id)
      containersCoordinateList += `${container.latitude.toFixed(6)},${container.longitude.toFixed(6)}|`
    })
    containersCoordinateList += disposalAreaCoordinates;

    console.log(encodeURIComponent(containersCoordinateList))

    // axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(containersCoordinateList)}&destinations=${encodeURIComponent(containersCoordinateList)}&key=${apiKey}`)
    //   .then(response => {
    //     console.log(response);
    //   }).catch(error => {
    //   console.log(error);
    // })
  }).catch(error => {
  console.log(error);
})



