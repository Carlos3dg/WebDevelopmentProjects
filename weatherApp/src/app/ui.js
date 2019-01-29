export class UI {
    constructor() {
        this.location = document.getElementById('weather-location');
        this.descWeather = document.getElementById('weather-description');
        this.temperature = document.getElementById('weather-string');
        this.humidity = document.getElementById('weather-humidity');
        this.wind = document.getElementById('weather-wind');       
    }
    //Method to inject the correspondent data from the json in the HTML
    render(weather) {
        this.location.textContent = weather.name + '/' + weather.sys.country;
        this.descWeather.textContent = weather.weather[0]['description'];
        this.temperature.textContent= weather.main.temp + ' °C';
        this.humidity.textContent = 'Humidity: ' + weather.main.humidity + '%';
        this.wind.textContent = 'Wind: ' + weather.wind.speed + 'm/s';
    }

}