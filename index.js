const express = require('express');
const { WebhookClient} = require('dialogflow-fulfillment');
const app = express();

/**
 * Require all intent fulfillment modules
 */
const f_welcome = require('./fulfillments/default/welcome');
const f_fallback = require('./fulfillments/default/fallback');
const f_name = require('./fulfillments/default/nameIntent');
const f_houseType = require('./fulfillments/default/TypeOfHouse');
const f_houseTypeNo = require('./fulfillments/default/TypeOfHouseNo');
const f_houseTypeYes = require('./fulfillments/default/TypeOfHouseYes');
const f_Budget = require('./fulfillments/default/budgetIntent');
const f_duration = require('./fulfillments/default/durationIntent');
const f_travel = require('./fulfillments/default/travelIntent');
const f_superMarket = require('./fulfillments/default/supermarket');
const f_municipality = require('./fulfillments/default/municipalityIntent');
const f_final = require('./fulfillments/default/NoMoreConstraintsIntent');
const f_submit = require('./fulfillments/default/ConfirmSubmission');
const f_tryagain = require('./fulfillments/default/tryagain');






app.post('/', express.json(), (req, res) => {

  const agent = new WebhookClient({ request: req, response: res });
  let intentMap = new Map();

  /**
   * Connect fulfillment modules to Dialogflow intents
   */
  intentMap.set('Default Welcome Intent', f_welcome.fulfillment);
  intentMap.set('Default Fallback Intent', f_fallback.fulfillment);
  intentMap.set('NameIntent', f_name.fulfillment);
  intentMap.set('TypeOfHouse', f_houseType.fulfillment);
  intentMap.set('TypeOfHouse - no', f_houseTypeNo.fulfillment);
  intentMap.set('TypeOfHouse - yes', f_houseTypeYes.fulfillment);
  intentMap.set('budgetIntent', f_Budget.fulfillment);
  intentMap.set('DurationIntent', f_duration.fulfillment);
  intentMap.set('TravelTimeIntent', f_travel.fulfillment);
  intentMap.set('SupermarketIntent', f_superMarket.fulfillment);
  intentMap.set('municipalityIntent', f_municipality.fulfillment);
  intentMap.set('NoMoreConstraintsIntent', f_final.fulfillment);
  intentMap.set('ConfirmSubmission', f_submit.fulfillment);
  intentMap.set('tryagain', f_tryagain.fulfillment);








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
