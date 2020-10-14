const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  // console.log(data);
  // const cityDetails = data.cityDetails;
  // const weather = data.weather;

  // Destructure properties
  const {cityDetails, weather} = data;

  // Update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // Update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  time.setAttribute("src", (weather.IsDayTime) ? "img/day.svg" : "img/night.svg");

  // Remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {cityDetails, weather};
};

cityForm.addEventListener("submit", evt => {
  // Prevent default action
  evt.preventDefault();

  // Get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update the UI with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err))

  // Set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}