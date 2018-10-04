import { findMeButton, form, searchButton, getWeatherByZip, getLocation, textField } from './js/welcome.js';
import { menuLinks, sidebar } from './js/sidebar.js'
import { tempButtons, menuContainer, menu, toggleTemp, responsiveHighlight } from './js/overview.js';
import "../styles.css";

const sections = [...document.querySelectorAll('section')];

// Retreive weather via user location
findMeButton.addEventListener('click', getLocation);

// Retreive weather via user input
form.addEventListener('submit', getWeatherByZip);
searchButton.addEventListener('click', getWeatherByZip);

// Toggle temperatures between celsius and farenheit 
tempButtons.map(button => button.addEventListener('click', toggleTemp));

// Toggle menu between active and non-active states
menuContainer.addEventListener('click', () => {
  menu.classList.toggle('active');
  document.querySelector('.sidebar-nav').classList.toggle('active');
});
window.addEventListener('resize', responsiveHighlight);

// Fun hover animation over menu links whilst on desktop
menuLinks.map(link => link.addEventListener('mouseover', () => {
  const menuOption = link.firstElementChild;
  window.innerWidth > 800 ? menuOption.classList.add('active') : '';
}));
menuLinks.map(link => link.addEventListener('mouseout', () => {
  const menuOption = link.firstElementChild;
  window.innerWidth > 800 ? menuOption.classList.remove('active') : '';
}));

// Transitions screens when selecting menu links
menuLinks.map(ahref => ahref.addEventListener('click', () => { 
  const link = ahref.firstElementChild;
  sidebar.classList.remove('active');
  menu.classList.remove('active');

  sections.map(section => {
    section.className.includes(link.dataset.pseudoClass) && section.className.includes('slide-out') ? section.classList.remove('slide-out') : '';
    !section.className.includes(link.dataset.pseudoClass) ? section.classList.add('slide-out') : '';
  });
}));

