export const loadedGoogleMapsAPI = new Promise( (resolve,reject) => {
  window['GoogleMapsInit'] = resolve;
  let GMap = document.createElement('script');

  const apiKey = "AIzaSyAFlUfBZOnqaEaGUjlqvriDBgnredJzj2A";
  const apiKeyUniversal = "AIzaSyBJAq1ZNlFd9sotXqrpPyrAo0wAQKDcQeU";

  GMap.setAttribute('src',
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}&map_ids=b15068e07cf8d4c6&callback=GoogleMapsInit&libraries=drawing,geometry`);

  document.body.appendChild(GMap);
});
