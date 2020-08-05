const express = require('express');
const path = require('path');
const { WebhookClient} = require('dialogflow-fulfillment');
const app = express();
var mongoose=require('mongoose');
var House = require("./fulfillments/default/models/house");
var Scenario = require("./fulfillments/default/models/scenarios");

// Database Connectivity
var mongoDB = 'mongodb+srv://akshitgupta:akshitgupta@cluster0.jvxlv.mongodb.net/clinteastwood?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// var house = new House({ name:"Oostblok, Delft",
//   description:"fully furnished loft studio",
//   summary:"Rent:EUR 715 Near the City Centre Min Contract Duration: 1.5 years (can be extended)",
//   url:"https://resources.directwonen.nl/image/020fe039-1cc9-464c-9db2-3f860249eae4" });
//
// House.create(house, function (err, awesome_instance) {
//   if (err) return handleError(err);
//   // saved!
//   var scene = new Scenario({
//     id:3,
//     description:"Jan is a Dutch citizen moving to Delft for a PhD. He is looking for a Studio Apartment for at least 2 years, with a maximum budget of 750 euros. He needs his place to be close to supermarket and does not mind the commute time to the university.",
//     constraints:{
//       nearSupermarkets:true,
//       municipalityRegistration:false,
//       typeOfAccomodation:"Studio",
//       commuteTime:9999,
//       duration:{
//         value:2,
//         unit:"yr"},
//       maxRent:750,
//       } ,
//     correctHouse:house._id// assign the _id from the our author Bob. This ID is created by default!
//   });
//
//   scene.save(function (err) {
//     if (err) return handleError(err);
//
//   });
// });


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

app.use('/', express.static(path.join(__dirname, 'public')));

console.log(`navigate to: http://localhost:8080/`);


app.route('/getScenario').get(async (req, res) => {
  let scenarioId = 1;
  if(req.query.sid!=="null")
    scenarioId = req.query.sid;
  const scenario = await Scenario.findOne( {id : scenarioId});
  res.send(scenario);
});