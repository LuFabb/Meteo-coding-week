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
  
  // prepare dates for api
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // you can't see apiKey for security reason
  const apiKey = 'apiKey';
  const language = 'en';
  const units = 'metric';
  const endPoint = 'https://api.openweathermap.org/data/2.5/weather'

  // we build the adress, with a query string!

  const apiUri = `${endPoint}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${language}&appid=${apiKey}`

  // call our external service

  fetch(apiUri)
  .then(function(response){
    // transform my response into a more readable format
    const data = response.json();
    return data;
  })
  .then(function(data) {
    console.log(data);
     // extract the information we need
     const locationName = data.name;
     const temperature = Math.floor(data.main.temp);
     const iconCode = data.weather[0].icon;
     const description = data.weather[0].description;
    
   });
}