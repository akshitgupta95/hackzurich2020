const express = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');
const app = express();

/**
 * Require all intent fulfillment modules
 */
const f_welcome = require('./fulfillments/default/welcome');
const f_fallback = require('./fulfillments/default/fallback');
const f_weather = require('./fulfillments/default/weather');
const f_flightweather = require('./fulfillments/default/flightweather');
// Todo: create and require a fulfillment module for each custom intent
// Hint: use the directory fulfillments/custom

app.post('/', express.json(), (req, res) => {

  const agent = new WebhookClient({ request: req, response: res });
  let intentMap = new Map();

  /**
   * Connect fulfillment modules to Dialogflow intents
   */
  intentMap.set('Default Welcome Intent', f_welcome.fulfillment);
  intentMap.set('Default Fallback Intent', f_fallback.fulfillment);
  intentMap.set('Default Weather Intent', f_weather.fulfillment);
  intentMap.set('Default Flight Weather Intent', f_flightweather.fulfillment);

  // Todo: connect each custom intent with custom fulfillment modules
  // Hint: create a intent in Dialogflow first

  // Connect the agent to the intent map
  agent.handleRequest(intentMap);

});

// Startup server on port 8080
console.log(`app listening on port 8080)`);
app.listen(process.env.PORT || 8080);
// Navigate to localhost:8080 in the browser to use dialogflow locally
console.log(`navigate to: http://localhost:8080`);
app.use(express.static('public'));
