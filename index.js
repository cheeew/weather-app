const textField = document.querySelector('.enter-city');
const findMeButton = document.querySelector('.track-my-location');
const locationResult = document.querySelector('.location-result');
const form = document.querySelector('form');

const googleApiKey = 'AIzaSyBWIsU_qcYzM8z_knUgr99-nnhQk4dYBkk';
const googleUrl = "https://maps.googleapis.com/maps/api/geocode/json";

const darkskyApiKey = '96fd99f683a5ebbcb2a8b68bd67f683e/';
const darkskyUrl = "https://api.darksky.net/forecast/";

function findCityCoords(e) {
  e.preventDefault();
  const userInput = textField.value.trim();
  const params = `?address=${userInput}&key=${googleApiKey}`;
  
  fetch(googleUrl + params)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const coords = `${data.results[0].geometry.location.lat},${data.results[0].geometry.location.lng}`;
      return fetchJsonp(darkskyUrl + darkskyApiKey + coords);
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      locationResult.innerHTML = `The temperature in the ${data.timezone} timezone is ${data.currently.temperature}`;
    });
}

function reportWeather(position) {
  let latitude = position.coords.latitude,
  longitude = position.coords.longitude;

  const getWeather = () => {
    const darkskyParams = `${darkskyApiKey}${latitude},${longitude}`;
  
    fetchJsonp(`${darkskyUrl}${darkskyParams}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        locationResult.innerHTML = `The temperature in the ${data.timezone} timezone is ${data.currently.temperature}`;
      });
  }
  return getWeather();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(reportWeather);
  } else {
    locationResult.innerHTML = "Geolocation isn't supported by this browser";
  }
}

form.addEventListener('submit', findCityCoords);
findMeButton.addEventListener('click', getLocation);
