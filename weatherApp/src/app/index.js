//To import the UI class from the ui.js
const { UI } = require('./ui');
const ui = new UI();
//To import the Weather class from weatherRequest.js
const { Weather } = require('./weatherRequest');
const weather = new Weather('London', 'uk');
require('./index.css');

async function fetchWeather() {
    const data = await weather.getWeather();
    console.log(data);
    ui.render(data);
}
//Event to get the API data requiere when the DOM is loaded
document.addEventListener('DOMContentLoaded', fetchWeather);

//Event to insert the weather country that the user insert in the form
document.getElementById('w-form').addEventListener('submit', (e) => {
    e.preventDefault();
    //Save inputs values provided by the user
    const city = document.getElementById('city').value;
    const countryCode = document.getElementById('countryCode').value;
    //Call changeCountry method from weather class to change the propertie values
    weather.changeCountry(city, countryCode);
    //Call again the fetchWeather function to make the request again but with the new values
    fetchWeather();

    document.getElementById('w-form').reset();
})

