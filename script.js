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
function onError(error) {
  console.error(error);
  weatherLocation.innerText = 'You need to activate the localization';
}

// Function in case of success
function onSuccess(position) {
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
    .then(function (response) {
      // transform my response into a more readable format
      const data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);
      // extract the information we need
      const locationName = data.name;
      const temperature = Math.floor(data.main.temp);
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;

      // Prepare the right suggestion
      const suggestion = getSuggestion(iconCode);

      // Insert data where we want to show them
      weatherLocation.innerText = locationName;
      weatherTemperature.innerText = `${temperature}°`;
      weatherIcon.alt = description;
      weatherIcon.src = `images/${iconCode}.png`;
      suggestionParagraph.innerText = suggestion;

      // Remove js-loading class
      rootElement.classList.remove('js-loading');
    });
}

// Function to retrieve the right suggestion

function getSuggestion(iconCode) {
  const suggestions = {
    '01d': 'Remember the sunscreen!',
    '01n': 'Goodnight!',
    '02d': 'The sun come and goes today...',
    '02n': 'Beware of werewolves...',
    '03d': 'Perfect light for taking pictures!',
    '03n': 'Sleep peacefully :)',
    '04d': 'What a gray sky :(',
    '04n': "You can't even seen the moon!",
    '09d': 'Take the umbrella',
    '09n': 'Cover up tightly!',
    '10d': 'Take the umbrella',
    '10n': 'Cover up tightly!',
    '11d': 'Beware of lightning!',
    '11n': 'Lightnings light up the night!',
    '13d': 'Go out and make a snowman!',
    '13n': 'Perfect night to stay under the duvet!',
    '50d': 'Turn on the fog lights!',
    '50n': 'Drive carefully!',
  }

  return suggestions[iconCode];
}

