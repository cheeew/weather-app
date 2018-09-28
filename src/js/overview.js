export const tempButtons = [...document.querySelectorAll('.temp-button')];
export const currentTempF = document.querySelector('.temp-f');
export const currentTempC = document.querySelector('.temp-c');
export const currentTemps = [...document.querySelectorAll('.current-value')];
export const highTemps = [...document.querySelectorAll('.high-value')];
export const highF = document.querySelector('.high-value-f');
export const highC = document.querySelector('.high-value-c');
export const lowTemps = [...document.querySelectorAll('.low-value')];
export const lowF = document.querySelector('.low-value-f');
export const lowC = document.querySelector('.low-value-c');
export const city = document.querySelector('.city');
export const menuContainer = document.querySelector('.menu-container');
export const menu = document.querySelector('.menu');

export function toggleTemp() {
  const changeUnit = () => tempButtons.map(b => {
    b.className.includes('active') ? b.classList.remove('active') : b.classList.add('active');
  });

  const changeTempValues = () => {
    highTemps.map(temp => {
      temp.className.includes('active') ? temp.classList.remove('active') : temp.classList.add('active');
    });

    lowTemps.map(temp => {
      temp.className.includes('active') ? temp.classList.remove('active') : temp.classList.add('active');
    });

    currentTemps.map(temp => {
      temp.className.includes('active') ? temp.classList.remove('active') : temp.classList.add('active');
    });
  }

  !this.className.includes('active') ? changeTempValues() : '';
  !this.className.includes('active') ? changeUnit() : '';
}