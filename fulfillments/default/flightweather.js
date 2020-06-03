const fullFillmentHelpers = require('./helpers/fulfillment-helpers');

/**
 * Intent: Default Flight Weather Intent
 * Fulfillment: default
 */

module.exports = {

  fulfillment: function (agent) {
    
    let params = agent.parameters;
    let departureCity = params.departureCity;
    let arrivalCity = params.arrivalCity;
    let arrivalTime = params.arrivalTime;

    if (departureCity !== '' && arrivalCity !== '' && arrivalTime !== '') {
      return new fullFillmentHelpers(agent).getFlightWeather(departureCity, arrivalCity, arrivalTime);
    }
    
  }

};