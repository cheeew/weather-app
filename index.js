const geocodeApi = 'AIzaSyBWIsU_qcYzM8z_knUgr99-nnhQk4dYBkk';
const findMeButton = document.querySelector('.ask-location');
const locationResult = document.querySelector('.location-result');

const url = "https://maps.googleapis.com/maps/api/geocode/json";
const params = `?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${geocodeApi}`;

function showPosition(position) {
  let latitude = position.coords.latitude, 
  longitude = position.coords.longitude;
  console.log(position);
  locationResult.innerHTML = `${latitude}, ${longitude}`;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationResult.innerHTML = "Geolocation isn't supported by this browser";
  }
}

findMeButton.addEventListener('click', getLocation);
