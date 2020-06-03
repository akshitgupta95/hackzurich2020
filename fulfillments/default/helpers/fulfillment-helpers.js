/**
 * Helpers: Helper functions to get weather and forecast
 * Constructor params: agent
 */

const axios = require('axios');
const moment = require('moment');

class fullFillmentHelpers {

  constructor(agent) {
    this.agent = agent;
  }

  //currentAPI

  // currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=";
  //forecastAPI
  // forecastAPI = `http://api.openweathermap.org/data/2.5/forecast?q=`;
  // key = `&APPID=bd305cb3fcc4f78dd6377b392d68945f`;

  //function to get the weather only based on location
  // getWeather(location) {
  //   let uri = `${this.currentWeatherAPI}${location}${this.key}`;
  //   return this.getWeatherFromAPI(uri)
  //     .then(response => {
  //       this.agent.add(`
  //       The current weather in ${location} is
  //       ${response.data.weather[0].description}
  //       with a temperature of ${this.getDegreesCelcius(response.data.main.temp)}\u00B0.
  //       The highest temp will be ${this.getDegreesCelcius(response.data.main.temp_max)}\u00B0
  //       and the lowest will be ${this.getDegreesCelcius(response.data.main.temp_min)}\u00B0.
  //       The windspeed is ${response.data.wind.speed}m/s from direction ${response.data.wind.deg}\u00B0.
  //       `);
  //     })
  //     .catch(err => {
  //       this.agent.add(`I don't know that location. Please provide a different location`)
  //     });
  // }

    //function to get the weather based on location and time
  // getForecast(location, time) {
  //   let uri = `${this.forecastAPI}${location}${this.key}`;
  //   return this.getWeatherFromAPI(uri)
  //     .then(response => {
  //       let closestForecast = this.getClosestTimeStampForecast(time, response.data.list);
  //
  //       this.agent.add(
  //         `The weather in ${location} at ${moment(time).format("DD-MM hh:mm a")} will be
  //         ${closestForecast.weather[0].description}
  //         with a temperature of ${this.getDegreesCelcius(closestForecast.main.temp)}\u00B0.
  //         The highest temp will be ${this.getDegreesCelcius(closestForecast.main.temp_max)}\u00B0
  //         and the lowest will be ${this.getDegreesCelcius(closestForecast.main.temp_min)}\u00B0.
  //         The windspeed is ${closestForecast.wind.speed}m/s from direction ${closestForecast.wind.deg}\u00B0.
  //       `);
  //     })
  //     .catch(err => {
  //       this.agent.add(`Sorry I can't get that forecast. Try with another location and/or time`)
  //     });
  // }

  //Takes three parameters, makes two api calls. One for current location and one for forecast in arrival location.
  // getFlightWeather(departureCity, arrivalCity, arrivalTime) {
  //   //Build uri's
  //   let uriDeparture = `${this.currentWeatherAPI}${departureCity}${this.key}`;
  //   let uriArrival = `${this.forecastAPI}${arrivalCity}${this.key}`;
  //
  //   //wait for two promises to return
  //   return axios.all([this.getWeatherFromAPI(uriDeparture), this.getWeatherFromAPI(uriArrival)]).then(axios.spread(
  //     (currentWeatherDeparture, forecastWeatherArrival) => {
  //       let closestForecast = this.getClosestTimeStampForecast(arrivalTime, forecastWeatherArrival.data.list);
  //
  //       this.agent.add(
  //         `The current weather in ${departureCity} is
  //         ${currentWeatherDeparture.data.weather[0].description}
  //         with a temperature of ${this.getDegreesCelcius(currentWeatherDeparture.data.main.temp)}\u00B0.
  //         The highest temp will be ${this.getDegreesCelcius(currentWeatherDeparture.data.main.temp_max)}\u00B0
  //         and the lowest will be ${this.getDegreesCelcius(currentWeatherDeparture.data.main.temp_min)}\u00B0.
  //         The windspeed is ${currentWeatherDeparture.data.wind.speed}m/s from direction ${currentWeatherDeparture.data.wind.deg} \u00B0.
  //
  //         Your arrival weather in ${arrivalCity} at ${moment(arrivalTime).format("hh:mm a")} will be
  //         ${closestForecast.weather[0].description}
  //         with a temperature of ${this.getDegreesCelcius(closestForecast.main.temp)}\u00B0.
  //         The highest temp will be ${this.getDegreesCelcius(closestForecast.main.temp_max)}\u00B0
  //         and the lowest will be ${this.getDegreesCelcius(closestForecast.main.temp_min)}\u00B0.
  //         The windspeed will be ${closestForecast.wind.speed}m/s from direction ${closestForecast.wind.deg}\u00B0.
  //         `
  //       )
  //     })).catch(err => console.log(err));
  // }

  // getWeatherFromAPI(uri) {
  //   return axios.get(uri);
  // }
  //
  // getDegreesCelcius(kelvinTemp) {
  //   return Math.round((kelvinTemp - 273.15) * 10) / 10;
  // }

  //API provides three hour interval up to 5 days for free, so we need to match closest time
  getClosestTimeStampForecast(time, timestampList) {
    //convert to unix timestamp because api returns also unix list 
    let askedTimestamp = moment(time).unix();

    let availableTimestampsLocation = timestampList.map(date => date.dt);

    //Sort closest given timestamp from user with timestamps returned from api for the forecast
    let closestTimeStamp = availableTimestampsLocation.sort((a, b) => {
      let distancea = Math.abs(askedTimestamp - a);
      let distanceb = Math.abs(askedTimestamp - b);
      return distancea - distanceb;
    })[0];

    //returns the closest forecast from list
    return timestampList.filter(forecast => forecast.dt === closestTimeStamp)[0];
  }
}

module.exports = fullFillmentHelpers;