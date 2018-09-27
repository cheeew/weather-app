import moment from 'moment-timezone';
moment().tz("America/Los_Angeles").format();

const textField = document.querySelector('.enter-city');
const findMeButton = document.querySelector('.find-location');
const form = document.querySelector('form');
const searchButton = document.querySelector('.search-button');
const locationResult = document.querySelector('.location-result');
const welcomeWrapper = document.querySelector('.welcome-wrapper');
const tempButtons = [...document.querySelectorAll('.temp-button')];
const farenheit = document.querySelector('.f');
const celsius = document.querySelector('.c');
const temp = document.querySelector('.temp');
const high = document.querySelector('.high-value');
const low = document.querySelector('.low-value');
const city = document.querySelector('.city');
const menuContainer = document.querySelector('.menu-container');
const menu = document.querySelector('.menu');

const googleApiKey = 'AIzaSyBWIsU_qcYzM8z_knUgr99-nnhQk4dYBkk';
const googleUrl = "https://maps.googleapis.com/maps/api/geocode/json";

const darkskyApiKey = '96fd99f683a5ebbcb2a8b68bd67f683e/';
const darkskyUrl = "https://api.darksky.net/forecast/";

function changeTempUnit() {
  const changeUnit = () => tempButtons.map(button => {
    if(button.className.includes('active-temp')) {
      button.classList.remove('active-temp')
    } else {
      button.classList.add('active-temp');
    } 
  });

  celsius.innerHTML = Math.round((Number(farenheit.innerHTML) - 32) * 5/9);

  !this.className.includes('active-temp') ? changeUnit() : '';
}

function getWeatherByZip(e) {
  e.preventDefault();
  const userZip = textField.value.trim();
  const googleParams = `?address=${userZip}&key=${googleApiKey}`;
  let location;

  fetch(googleUrl + googleParams)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const coords = `${data.results[0].geometry.location.lat},${data.results[0].geometry.location.lng}`;
      location = data.results[0].formatted_address;
      city.innerHTML = data.results[0].address_components[1].long_name;
      return fetchJsonp(darkskyUrl + darkskyApiKey + coords);
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const timezone = data.timezone;
      data.hourly.data.map(item => {
        const thisMoment = moment.tz(item.time * 1000, timezone);
        console.log(`${thisMoment.month()}/${thisMoment.day()}`);
        temp.innerHTML = Math.round(data.currently.temperature);
        high.innerHTML = Math.round(data.daily.data[0].temperatureMax);
        low.innerHTML = Math.round(data.daily.data[0].temperatureLow);
      });
      form.reset();
      welcomeWrapper.classList.add('slide-out');
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
        temp.innerHTML = `${Math.round(data.currently.temperature)}`;
      });
  }
  getWeather();
  welcomeWrapper.classList.add('slide-out');
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
tempButtons.map(button => button.addEventListener('click', changeTempUnit));
menuContainer.addEventListener('click', () => menu.classList.toggle('active'));
