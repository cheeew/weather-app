import { config } from './config';
import { city, currentTempF, currentTempC, highF, highC, lowF, lowC } from './overview.js'

export const welcomeWrapper = document.querySelector('.welcome-wrapper');
export const textField = document.querySelector('.enter-city');
export const findMeButton = document.querySelector('.find-location');
export const form = document.querySelector('form');
export const searchButton = document.querySelector('.search-button');

export function getWeatherByZip(e) {
  e.preventDefault();
  const userZip = textField.value.trim();
  const googleParams = `?address=${userZip}&key=${config.googleApiKey}`;

  fetch(config.googleUrl + googleParams)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const coords = `${data.results[0].geometry.location.lat},${data.results[0].geometry.location.lng}`;
      city.innerHTML = data.results[0].address_components[1].long_name;
      return fetchJsonp(config.darkskyUrl + config.darkskyApiKey + coords);
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.hourly.data.map(item => {
        currentTempF.innerHTML = Math.round(data.currently.temperature);
        highF.innerHTML = Math.round(data.daily.data[0].temperatureMax);
        lowF.innerHTML = Math.round(data.daily.data[0].temperatureLow);
        currentTempC.innerHTML = Math.round((currentTempF.innerHTML - 32) * (5/9));
        highC.innerHTML = Math.round((highF.innerHTML - 32) * (5/9));
        lowC.innerHTML = Math.round((lowF.innerHTML - 32) * (5/9));
      });
      form.reset();
      welcomeWrapper.classList.add('slide-out');
    });
}

export function getWeatherByLocation(position) {
  let latitude = position.coords.latitude,
  longitude = position.coords.longitude;
  const googleParams = `?latlng=${latitude},${longitude}&key=${config.googleApiKey}`,
  darkskyParams = `${config.darkskyApiKey}${latitude},${longitude}`;
  let location;

  const getWeather = () => {
    fetch(config.googleUrl + googleParams)
      .then(response => response.json())
      .then(data => {
        location = data.results[4].formatted_address;
        return fetchJsonp(`${config.darkskyUrl}${darkskyParams}`);
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        currentTempF.innerHTML = `${Math.round(data.currently.temperature)}`;
      });
  }
  getWeather();
  welcomeWrapper.classList.add('slide-out');
}

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherByLocation);
  } else {
    alert("Geolocation isn't supported by this browser");
  }
}
