import { findMeButton, form, searchButton, getWeatherByZip, getLocation, textField } from './js/welcome.js';
import { menuLinks, sidebar } from './js/sidebar.js'
import { tempButtons, menuContainer, menu, toggleTemp, responsiveHighlight } from './js/overview.js';
import moment from 'moment-timezone';
moment().tz("America/Los_Angeles").format();
const sections = [...document.querySelectorAll('section')];

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
  window.innerWidth > 800 ? menuOption.classList.add('active') : '';
}));
menuLinks.map(link => link.addEventListener('mouseout', () => {
  const menuOption = link.firstElementChild;
  window.innerWidth > 800 ? menuOption.classList.remove('active') : '';
}));

// Use only for app development / delete upon app completion
menuLinks.map(ahref => ahref.addEventListener('click', () => { 
  const link = ahref.firstElementChild;
  sidebar.classList.remove('active');
  menu.classList.remove('active');

  sections.map(section => {
    section.className.includes(link.dataset.pseudoClass) && section.className.includes('slide-out') ? section.classList.remove('slide-out') : '';
    !section.className.includes(link.dataset.pseudoClass) ? section.classList.add('slide-out') : '';
  });

  textField.focus();
}));

