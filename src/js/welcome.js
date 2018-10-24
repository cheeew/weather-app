import { config } from "./config";
import {
  city,
  currentTempF,
  currentTempC,
  highF,
  highC,
  lowF,
  lowC,
  weatherIcon,
  overviewWrapper,
  menu,
  menuContainer
} from "./overview";
import {
  hourTitle,
  hourImage,
  tempTitle,
  weekday,
  dayIcon,
  dayLow,
  dayHigh
} from "./forecast";
import {
  todaySummary,
  weekSummary,
  windSpeedResult,
  humidityResult,
  visibilityResult,
  uvIndexResult,
  precipitationResult,
  dewPoint
} from "./details";

export const welcomeWrapper = document.querySelector(".welcome-wrapper");
export const textField = document.querySelector(".enter-city");
export const findMeButton = document.querySelector(".find-location");
export const form = document.querySelector("form");
export const searchButton = document.querySelector(".search-button");

// Retrieves weather via user input (city or zip)
export function getWeatherByZip(e) {
  e.preventDefault();
  const userZip = textField.value.trim();
  const googleParams = `?address=${userZip}&key=${config.googleApiKey}`;
  let i = 0;

  // Converts user input to lat & long coordinates and passes coordinates to dark sky api
  fetch(config.googleUrl + googleParams)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const coords = `${data.results[0].geometry.location.lat},${
        data.results[0].geometry.location.lng
      }`;
      // Populates city in header
      data.results[0].address_components.map(address => {
        address.types.includes("locality")
          ? (city.innerHTML = address.long_name)
          : "";
      });
      return fetchJsonp(
        `${config.darkskyUrl}${config.darkskyApiKey}/${coords}`
      );
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // populate current, high & low °F temperatures
      currentTempF.innerHTML = Math.round(data.currently.temperature);
      highF.innerHTML = Math.round(data.daily.data[0].temperatureMax);
      lowF.innerHTML = Math.round(data.daily.data[0].temperatureLow);

      // populate current, high & low °C temperatures
      currentTempC.innerHTML = Math.round(
        (currentTempF.innerHTML - 32) * (5 / 9)
      );
      highC.innerHTML = Math.round((highF.innerHTML - 32) * (5 / 9));
      lowC.innerHTML = Math.round((lowF.innerHTML - 32) * (5 / 9));

      // populate weather image
      data.currently.icon === "clear-day"
        ? weatherIcon.map(icon => (icon.src = "./weather_icons/clear-day.png"))
        : "";
      data.currently.icon === "clear-night"
        ? weatherIcon.map(
            icon => (icon.src = "./weather_icons/clear-night.png")
          )
        : "";
      data.currently.icon === "partly-cloudy-day"
        ? weatherIcon.map(
            icon => (icon.src = "./weather_icons/partly-cloudy-day.png")
          )
        : "";
      data.currently.icon === "partly-cloudy-night"
        ? weatherIcon.map(
            icon => (icon.src = "./weather_icons/partly-cloudy-night.png")
          )
        : "";
      data.currently.icon === "cloudy"
        ? weatherIcon.map(icon => (icon.src = "./weather_icons/cloudy.png"))
        : "";
      data.currently.icon === "rain"
        ? weatherIcon.map(icon => (icon.src = "./weather_icons/rain.png"))
        : "";
      data.currently.icon === "fog"
        ? weatherIcon.map(icon => (icon.src = "./weather_icons/fog.png"))
        : "";
      data.currently.icon === "wind"
        ? weatherIcon.map(icon => (icon.src = "./weather_icons/wind.png"))
        : "";

      // Populate Hourly Forecast
      data.hourly.data.map(array => {
        if (i > 23) return;

        // Print Hour in Hourly Forecast
        const hour = new Date(array.time * 1000).getHours();
        hour > 12
          ? (hourTitle[i].innerHTML = `${hour - 12} PM`)
          : (hourTitle[i].innerHTML = `${hour} AM`);
        hour == 0 ? (hourTitle[i].innerHTML = "12 AM") : "";
        hour == 12 ? (hourTitle[i].innerHTML = "12 PM") : "";

        // Print Temp in Hourly Forecast
        tempTitle[i].innerHTML = `${Math.round(array.temperature)}°`;

        // Print Weather Icon in Hourly Forecast
        array.icon === "clear-day"
          ? (hourImage[i].src = "./weather_icons/clear-day.png")
          : "";
        array.icon === "clear-night"
          ? (hourImage[i].src = "./weather_icons/clear-night.png")
          : "";
        array.icon === "partly-cloudy-day"
          ? (hourImage[i].src = "./weather_icons/partly-cloudy-day.png")
          : "";
        array.icon === "partly-cloudy-night"
          ? (hourImage[i].src = "./weather_icons/partly-cloudy-night.png")
          : "";
        array.icon === "cloudy"
          ? (hourImage[i].src = "./weather_icons/cloudy.png")
          : "";
        array.icon === "rain"
          ? (hourImage[i].src = "./weather_icons/rain.png")
          : "";
        array.icon === "fog"
          ? (hourImage[i].src = "./weather_icons/fog.png")
          : "";
        array.icon === "wind"
          ? (hourImage[i].src = "./weather_icons/wind.png")
          : "";

        i += 1;
      });
      // reset iterator
      i = 0;

      // Populate Weekly Forecast
      data.daily.data.map(array => {
        if (i > 7) return;

        // Print Day
        const day = new Date().getDay();
        const week = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        const today = day + i;
        weekday[i].innerHTML = today > 6 ? week[today - 7] : week[today];

        // Print High/Low Temps
        dayLow[i].innerHTML = `${Math.round(array.temperatureLow)}°`;
        dayHigh[i].innerHTML = `${Math.round(array.temperatureHigh)}°`;

        // Print Weather Icon
        array.icon === "clear-day"
          ? (dayIcon[i].src = "./weather_icons/clear-day.png")
          : "";
        array.icon === "clear-night"
          ? (dayIcon[i].src = "./weather_icons/clear-night.png")
          : "";
        array.icon === "partly-cloudy-day"
          ? (dayIcon[i].src = "./weather_icons/partly-cloudy-day.png")
          : "";
        array.icon === "partly-cloudy-night"
          ? (dayIcon[i].src = "./weather_icons/partly-cloudy-night.png")
          : "";
        array.icon === "cloudy"
          ? (dayIcon[i].src = "./weather_icons/cloudy.png")
          : "";
        array.icon === "rain"
          ? (dayIcon[i].src = "./weather_icons/rain.png")
          : "";
        array.icon === "fog"
          ? (dayIcon[i].src = "./weather_icons/fog.png")
          : "";
        array.icon === "wind"
          ? (dayIcon[i].src = "./weather_icons/wind.png")
          : "";

        i += 1;
      });
      // Populate Details Page
      todaySummary.innerHTML = `Today: ${data.daily.data[0].summary}`;
      weekSummary.innerHTML = `Week: ${data.daily.summary}`;
      windSpeedResult.innerHTML = `${Math.round(data.currently.windSpeed)} m/h`;
      humidityResult.innerHTML = `${Math.round(
        data.currently.humidity * 100
      )}%`;
      visibilityResult.innerHTML = `${data.currently.visibility}`;
      uvIndexResult.innerHTML = data.currently.uvIndex;
      precipitationResult.innerHTML = data.currently.precipProbability;
      dewPoint.innerHTML = Math.round(data.currently.dewPoint);
    });
  // Form reset, page transitions & omnipresent menu
  form.reset();
  overviewWrapper.className.includes("slide-out")
    ? overviewWrapper.classList.remove("slide-out")
    : "";
  welcomeWrapper.classList.add("slide-out");
  menu.style.zIndex = "7";
  menuContainer.style.zIndex = "7";
}

// Retrieves weather via user location
export function getWeatherByLocation(position) {
  const { latitude, longitude } = position.coords;
  const googleParams = `?latlng=${latitude},${longitude}&key=${
    config.googleApiKey
  }`;
  const darkskyParams = `${config.darkskyApiKey}/${latitude},${longitude}`;
  let i = 0;

  const getWeather = () => {
    // Converts lat & long coordinates to city
    fetch(config.googleUrl + googleParams)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Populates city in header
        data.results[0].address_components.map(address => {
          address.types.includes("locality")
            ? (city.innerHTML = address.long_name)
            : "";
        });
      });

    // Calls Dark Sky api
    fetchJsonp(`${config.darkskyUrl}${darkskyParams}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // populates current, high & low °F temperatures
        currentTempF.innerHTML = Math.round(data.currently.temperature);
        highF.innerHTML = Math.round(data.daily.data[0].temperatureMax);
        lowF.innerHTML = Math.round(data.daily.data[0].temperatureLow);

        // populates current, high & low °C temperatures
        currentTempC.innerHTML = Math.round(
          (currentTempF.innerHTML - 32) * (5 / 9)
        );
        highC.innerHTML = Math.round((highF.innerHTML - 32) * (5 / 9));
        lowC.innerHTML = Math.round((lowF.innerHTML - 32) * (5 / 9));

        // populates weather image
        data.currently.icon === "clear-day"
          ? weatherIcon.map(
              icon => (icon.src = "./weather_icons/clear-day.png")
            )
          : "";
        data.currently.icon === "clear-night"
          ? weatherIcon.map(
              icon => (icon.src = "./weather_icons/clear-night.png")
            )
          : "";
        data.currently.icon === "partly-cloudy-day"
          ? weatherIcon.map(
              icon => (icon.src = "./weather_icons/partly-cloudy-day.png")
            )
          : "";
        data.currently.icon === "partly-cloudy-night"
          ? weatherIcon.map(
              icon => (icon.src = "./weather_icons/partly-cloudy-night.png")
            )
          : "";
        data.currently.icon === "cloudy"
          ? weatherIcon.map(icon => (icon.src = "./weather_icons/cloudy.png"))
          : "";
        data.currently.icon === "rain"
          ? weatherIcon.map(icon => (icon.src = "./weather_icons/rain.png"))
          : "";
        data.currently.icon === "fog"
          ? weatherIcon.map(icon => (icon.src = "./weather_icons/fog.png"))
          : "";
        data.currently.icon === "wind"
          ? weatherIcon.map(icon => (icon.src = "./weather_icons/wind.png"))
          : "";

        // Populates Hourly Forecast
        data.hourly.data.map(array => {
          if (i > 23) return;
          // Prints Hour
          const hour = new Date(array.time * 1000).getHours();
          hour > 12
            ? (hourTitle[i].innerHTML = `${hour - 12} PM`)
            : (hourTitle[i].innerHTML = `${hour} AM`);
          hour == 0 ? (hourTitle[i].innerHTML = "12 AM") : "";
          hour == 12 ? (hourTitle[i].innerHTML = "12 PM") : "";

          // Prints Temp
          tempTitle[i].innerHTML = `${Math.round(array.temperature)}°`;

          // Prints Icon
          array.icon === "clear-day"
            ? (hourImage[i].src = "./weather_icons/clear-day.png")
            : "";
          array.icon === "clear-night"
            ? (hourImage[i].src = "./weather_icons/clear-night.png")
            : "";
          array.icon === "partly-cloudy-day"
            ? (hourImage[i].src = "./weather_icons/partly-cloudy-day.png")
            : "";
          array.icon === "partly-cloudy-night"
            ? (hourImage[i].src = "./weather_icons/partly-cloudy-night.png")
            : "";
          array.icon === "cloudy"
            ? (hourImage[i].src = "./weather_icons/cloudy.png")
            : "";
          array.icon === "rain"
            ? (hourImage[i].src = "./weather_icons/rain.png")
            : "";
          array.icon === "fog"
            ? (hourImage[i].src = "./weather_icons/fog.png")
            : "";
          array.icon === "wind"
            ? (hourImage[i].src = "./weather_icons/wind.png")
            : "";

          i += 1;
        });
        // resets iterator
        i = 0;

        // Populates Weekly Forecast
        data.daily.data.map(array => {
          if (i > 7) return;
          // Prints Day
          const day = new Date().getDay();
          const week = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ];
          const today = day + i;
          weekday[i].innerHTML = today > 6 ? week[today - 7] : week[today];

          // Prints High/Low Temps
          dayLow[i].innerHTML = `${Math.round(array.temperatureLow)}°`;
          dayHigh[i].innerHTML = `${Math.round(array.temperatureHigh)}°`;

          // Prints Weather Icon
          array.icon === "clear-day"
            ? (dayIcon[i].src = "./weather_icons/clear-day.png")
            : "";
          array.icon === "clear-night"
            ? (dayIcon[i].src = "./weather_icons/clear-night.png")
            : "";
          array.icon === "partly-cloudy-day"
            ? (dayIcon[i].src = "./weather_icons/partly-cloudy-day.png")
            : "";
          array.icon === "partly-cloudy-night"
            ? (dayIcon[i].src = "./weather_icons/partly-cloudy-night.png")
            : "";
          array.icon === "cloudy"
            ? (dayIcon[i].src = "./weather_icons/cloudy.png")
            : "";
          array.icon === "rain"
            ? (dayIcon[i].src = "./weather_icons/rain.png")
            : "";
          array.icon === "fog"
            ? (dayIcon[i].src = "./weather_icons/fog.png")
            : "";
          array.icon === "wind"
            ? (dayIcon[i].src = "./weather_icons/wind.png")
            : "";

          i += 1;
        });
        // Populates Details Page
        todaySummary.innerHTML = `Today: ${data.daily.data[0].summary}`;
        weekSummary.innerHTML = `Week: ${data.daily.summary}`;
        windSpeedResult.innerHTML = `${Math.round(
          data.currently.windSpeed
        )} m/h`;
        humidityResult.innerHTML = `${Math.round(
          data.currently.humidity * 100
        )}%`;
        visibilityResult.innerHTML = `${data.currently.visibility}`;
        uvIndexResult.innerHTML = data.currently.uvIndex;
        precipitationResult.innerHTML = data.currently.precipProbability;
        dewPoint.innerHTML = Math.round(data.currently.dewPoint);
      });
  };
  // Calls function, applies transitions effects, omnipresent menu
  getWeather();
  overviewWrapper.className.includes("slide-out")
    ? overviewWrapper.classList.remove("slide-out")
    : "";
  welcomeWrapper.classList.add("slide-out");
  menu.style.zIndex = "7";
  menuContainer.style.zIndex = "7";
}

// Tracks user location
export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherByLocation);
  } else {
    alert("Geolocation isn't supported by this browser");
  }
}
