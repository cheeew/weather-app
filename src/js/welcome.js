import { config } from './config';
import { city, currentTempF, currentTempC, highF, highC, lowF, lowC, weatherIcon } from './overview.js';
import { hourTitle, hourImage, tempTitle, weekday, dayIcon, dayLow, dayHigh } from './forecast.js';

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
  let i = 0;

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
      data.currently.icon === 'cloudy' ? weatherIcon.src = "./weather_icons/cloudy.png" : '';
      data.currently.icon === 'rain' ? weatherIcon.src = "./weather_icons/rain.png" : '';
      // Populate Hourly Forecast
      data.hourly.data.map(array => { 
        if(i > 23) return;
        // Print Hour
        const hour = new Date(array.time * 1000).getHours();
        hour > 12 ? hourTitle[i].innerHTML = `${hour - 12} PM` : hourTitle[i].innerHTML = `${hour} AM`;
        hour == 0 ? hourTitle[i].innerHTML = "12 AM" : '';
        hour == 12 ? hourTitle[i].innerHTML = "12 PM" : '';
        // Print Temp
        tempTitle[i].innerHTML = `${Math.round(array.temperature)}°`;
        // Print Icon
        array.icon === 'clear-day' ? hourImage[i].src = "./weather_icons/clear-day.png" : '';
        array.icon === 'clear-night' ? hourImage[i].src = "./weather_icons/clear-night.png" : '';
        array.icon === 'partly-cloudy-day' ? hourImage[i].src = "./weather_icons/partly-cloudy-day.png" : '';
        array.icon === 'partly-cloudy-night' ? hourImage[i].src = "./weather_icons/partly-cloudy-night.png" : '';
        array.icon === 'cloudy' ? hourImage[i].src = "./weather_icons/cloudy.png" : '';
        array.icon === 'rain' ? hourImage[i].src = "./weather_icons/rain.png" : '';

        i += 1;
      });
      // reset iterator
      i = 0;
      // Populate Weekly Forecast
      data.daily.data.map(array => { 
        if(i > 7) return;
        // Print Day
        const day = new Date().getDay();
        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = day + i;
        weekday[i].innerHTML = today > 6 ? week[today - 7] : week[today];
        // Print High/Low Temps
        dayLow[i].innerHTML = `${Math.round(array.temperatureLow)}°`;
        dayHigh[i].innerHTML = `${Math.round(array.temperatureHigh)}°`;
        // Print Weather Icon
        array.icon === 'clear-day' ? dayIcon[i].src = "./weather_icons/clear-day.png" : '';
        array.icon === 'clear-night' ? dayIcon[i].src = "./weather_icons/clear-night.png" : '';
        array.icon === 'partly-cloudy-day' ? dayIcon[i].src = "./weather_icons/partly-cloudy-day.png" : '';
        array.icon === 'partly-cloudy-night' ? dayIcon[i].src = "./weather_icons/partly-cloudy-night.png" : '';
        array.icon === 'cloudy' ? dayIcon[i].src = "./weather_icons/cloudy.png" : '';
        array.icon === 'rain' ? dayIcon[i].src = "./weather_icons/rain.png" : '';

        i += 1;
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
        data.currently.icon === 'cloudy' ? weatherIcon.src = "./weather_icons/cloudy.png" : '';
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
