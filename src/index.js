import { findMeButton, form, searchButton, getWeatherByZip, getLocation, welcomeWrapper, textField, autoComplete} from './js/welcome.js';
import { menuLinks, sidebar } from './js/sidebar.js'
import { tempButtons, menuContainer, menu, toggleTemp, responsiveHighlight, overviewWrapper } from './js/overview.js';
import moment from 'moment-timezone';
moment().tz("America/Los_Angeles").format();

findMeButton.addEventListener('click', getLocation);
form.addEventListener('submit', getWeatherByZip);
searchButton.addEventListener('click', getWeatherByZip);
tempButtons.map(button => button.addEventListener('click', toggleTemp));
menuContainer.addEventListener('click', () => {
  menu.classList.toggle('active');
  document.querySelector('.sidebar-nav').classList.toggle('active');
});
window.addEventListener('resize', responsiveHighlight);
menuLinks.map(link => link.addEventListener('mouseover', () => {
  const menuOption = link.firstElementChild;
  menuOption.classList.add('active');
}));
menuLinks.map(link => link.addEventListener('mouseout', () => {
  const menuOption = link.firstElementChild;
  menuOption.classList.remove('active');
}));
// textField.addEventListener('keyup', autoComplete);

// Use only for app development / delete upon app completion
const skip = document.querySelector('.skip');
skip.addEventListener('click', () => welcomeWrapper.classList.add('slide-out'));

menuLinks.map(link => link.addEventListener('click', () => { 
  sidebar.classList.remove('active');
  menu.classList.remove('active');
  link.firstElementChild.innerHTML === 'Welcome' ? welcomeWrapper.classList.remove('slide-out') : '';
  link.firstElementChild.innerHTML === 'Forecast' ? overviewWrapper.classList.add('slide-out') : '';
  textField.focus();
}));

