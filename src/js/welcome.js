import { config } from './config';
import { city, currentTempF, currentTempC, highF, highC, lowF, lowC, weatherIcon } from './overview.js';

export const welcomeWrapper = document.querySelector('.welcome-wrapper');
export const textField = document.querySelector('.enter-city');
export const findMeButton = document.querySelector('.find-location');
export const form = document.querySelector('form');
export const searchButton = document.querySelector('.search-button');

export function autoComplete(e) {
  console.log(e);
  let userInput = textField.value;

  fetch(`${config.googlePlacesURL}input=${userInput}&types=geocode&key=${config.googleApiKey}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

export function getWeatherByZip(e) {
  e.preventDefault();
  const userZip = textField.value.trim();
  const googleParams = `?address=${userZip}&key=${config.googleApiKey}`;

  fetch(config.googleUrl + googleParams)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const coords = `${data.results[0].geometry.location.lat},${data.results[0].geometry.location.lng}`;
      data.results[0].address_components.map(address => {
        address.types.includes('locality') ? city.innerHTML = address.long_name : '';
      });
      return fetchJsonp(config.darkskyUrl + config.darkskyApiKey + coords);
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.hourly.data.map(item => {
        // populate current, high & low °F temperatures
        currentTempF.innerHTML = Math.round(data.currently.temperature);
        highF.innerHTML = Math.round(data.daily.data[0].temperatureMax);
        lowF.innerHTML = Math.round(data.daily.data[0].temperatureLow);
        // populate current, high & low °C temperatures
        currentTempC.innerHTML = Math.round((currentTempF.innerHTML - 32) * (5/9));
        highC.innerHTML = Math.round((highF.innerHTML - 32) * (5/9));
        lowC.innerHTML = Math.round((lowF.innerHTML - 32) * (5/9));
        // populate weather image
        data.currently.icon === 'clear-day' ? weatherIcon.src = "./weather_icons/clear-day.png" : '';
        data.currently.icon === 'clear-night' ? weatherIcon.src = "./weather_icons/clear-night.png" : '';
        data.currently.icon === 'partly-cloudy-day' ? weatherIcon.src = "./weather_icons/partly-cloudy-day.png" : '';
        data.currently.icon === 'partly-cloudy-night' ? weatherIcon.src = "./weather_icons/partly-cloudy-night.png" : '';
        data.currently.icon === 'rain' ? weatherIcon.src = "./weather_icons/rain.png" : '';
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
        console.log(data);
        data.results[0].address_components.map(address => {
          address.types.includes('locality') ? city.innerHTML = address.long_name : '';
        });
        return fetchJsonp(`${config.darkskyUrl}${darkskyParams}`);
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // populate current, high & low °F temperatures
        currentTempF.innerHTML = Math.round(data.currently.temperature);
        highF.innerHTML = Math.round(data.daily.data[0].temperatureMax);
        lowF.innerHTML = Math.round(data.daily.data[0].temperatureLow);
        // populate current, high & low °C temperatures
        currentTempC.innerHTML = Math.round((currentTempF.innerHTML - 32) * (5/9));
        highC.innerHTML = Math.round((highF.innerHTML - 32) * (5/9));
        lowC.innerHTML = Math.round((lowF.innerHTML - 32) * (5/9));
        // populate weather image
        data.currently.icon === 'clear-day' ? weatherIcon.src = "./weather_icons/clear-day.png" : '';
        data.currently.icon === 'clear-night' ? weatherIcon.src = "./weather_icons/clear-night.png" : '';
        data.currently.icon === 'partly-cloudy-day' ? weatherIcon.src = "./weather_icons/partly-cloudy-day.png" : '';
        data.currently.icon === 'partly-cloudy-night' ? weatherIcon.src = "./weather_icons/partly-cloudy-night.png" : '';
        data.currently.icon === 'rain' ? weatherIcon.src = "./weather_icons/rain.png" : '';
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
