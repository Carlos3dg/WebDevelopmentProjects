//Creation of the class where the instance could call the async function where the requuest is done. This class has to be export to use it in other programs
export class Weather {
    constructor(city,countryCode) {
        this.apikey = '70f350001fe17cc5565ef98b9d22734d'
        this.city = city;
        this.countryCode = countryCode;
    }

    async getWeather() {
        //URL structured according with the input data from the user
        const URI = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.countryCode}&units=metric&appid=${this.apikey}`;
        const response = await fetch(URI);
        const data = await response.json();
        return data;
    }

     //Method to change the propertie values according to the user input form
    changeCountry(city, countryCode) {
        this.city = city;
        this.countryCode = countryCode;
    }
}