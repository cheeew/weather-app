import moment from 'moment-timezone';
moment().tz("America/Los_Angeles").format();

const textField = document.querySelector('.enter-city');
const findMeButton = document.querySelector('.find-location');
const form = document.querySelector('form');
const searchButton = document.querySelector('.search-button');
const locationResult = document.querySelector('.location-result');

const googleApiKey = 'AIzaSyBWIsU_qcYzM8z_knUgr99-nnhQk4dYBkk';
const googleUrl = "https://maps.googleapis.com/maps/api/geocode/json";

const darkskyApiKey = '96fd99f683a5ebbcb2a8b68bd67f683e/';
const darkskyUrl = "https://api.darksky.net/forecast/";

function getWeatherByZip(e) {
  e.preventDefault();
  const userZip = textField.value.trim();
  const googleParams = `?address=${userZip}&key=${googleApiKey}`;
  let location;

  fetch(googleUrl + googleParams)
    .then(response => response.json())
    .then(data => {
      const coords = `${data.results[0].geometry.location.lat},${data.results[0].geometry.location.lng}`;
      location = data.results[0].formatted_address;
      return fetchJsonp(darkskyUrl + darkskyApiKey + coords);
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      locationResult.innerHTML = `The temperature in ${location} is ${Math.round(data.currently.temperature)}°F`;
      const timezone = data.timezone;
      data.hourly.data.map(item => {
        const thisMoment = moment.tz(item.time * 1000, timezone);
        console.log(`${thisMoment.month()}/${thisMoment.day()}`);
      });
      form.reset();
      textField.focus();
    });
}

function getWeatherByLocation(position) {
  let latitude = position.coords.latitude,
  longitude = position.coords.longitude;
  const googleParams = `?latlng=${latitude},${longitude}&key=${googleApiKey}`,
  darkskyParams = `${darkskyApiKey}${latitude},${longitude}`;
  let location;

  const getWeather = () => {
    fetch(googleUrl + googleParams)
      .then(response => response.json())
      .then(data => {
        location = data.results[4].formatted_address;
        return fetchJsonp(`${darkskyUrl}${darkskyParams}`);
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        locationResult.innerHTML = 
          `The temperature in ${location} is ${Math.round(data.currently.temperature)}°F`;
      });
  }
  return getWeather();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherByLocation);
  } else {
    locationResult.innerHTML = "Geolocation isn't supported by this browser";
  }
}

findMeButton.addEventListener('click', getLocation);
form.addEventListener('submit', getWeatherByZip);
searchButton.addEventListener('click', getWeatherByZip);
