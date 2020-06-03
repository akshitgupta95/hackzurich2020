const fullFillmentHelpers = require('./helpers/fulfillment-helpers');

/**
 * Intent: Default Weather Intent
 * Fulfillment: default
 */

module.exports = {

  fulfillment: function (agent) {
    let params = agent.parameters;
    let location = params['geo-city'];
    //If time is empty but date not we can get date for forecast
    let time = params.time !== '' ? params.time : params.date;

    if ('location' === '') {
      //Ask for location if none given. should not be happening since it is requiered 
      agent.add('Please provide me a location, so I can look it up');
      return;
    } else if (time !== '') {
      //if time is present we can query the forecast of the api for a given location
      return new fullFillmentHelpers(agent).getForecast(location, time);
    } else {
      //just return the weather for the location
      return new fullFillmentHelpers(agent).getWeather(location);
    }
  }

}