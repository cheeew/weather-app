import { findMeButton, form, searchButton, getWeatherByZip, getLocation } from './js/welcome.js';
import { tempButtons, menuContainer, menu, toggleTemp, responsiveHighlight } from './js/overview.js';
import moment from 'moment-timezone';
moment().tz("America/Los_Angeles").format();

findMeButton.addEventListener('click', getLocation);
form.addEventListener('submit', getWeatherByZip);
searchButton.addEventListener('click', getWeatherByZip);
tempButtons.map(button => button.addEventListener('click', toggleTemp));
menuContainer.addEventListener('click', () => menu.classList.toggle('active'));
window.addEventListener('resize', responsiveHighlight);
