// retrieve the elements we need from the page
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const suggestionParagraph = document.querySelector('.suggestion');

// retrieve the root element - <html> tag
const rootElement = document.documentElement;

// retrieve our position with the geolocation API
window.navigator.geolocation.getCurrentPosition(onSuccess, onError);


// Function in case of error
function onError(error){
  console.error(error);
  weatherLocation.innerText = 'You need to activate the localization';
}

// Function in case of success
function onSuccess(position){
  console.log(position);
}