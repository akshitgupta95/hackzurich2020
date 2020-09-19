const express = require('express');

const path = require('path');
const { WebhookClient } = require('dialogflow-fulfillment');

const bodyParser = require('body-parser');
const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

var mongoose=require('mongoose');
var House = require("./fulfillments/default/models/house");
var Scenario = require("./fulfillments/default/models/scenarios");
var Worker=require("./fulfillments/default/models/worker");

// Database Connectivity
var mongoDB = 'mongodb+srv://user:user@cluster0.lhf19.mongodb.net/hackzurich?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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
const f_feeling = require('./fulfillments/default/feelingIntent');
const f_feeling_yes = require('./fulfillments/default/feelingIntent-yes');
const f_feeling_no = require('./fulfillments/default/feelingIntent-no');
const f_badfeeling = require('./fulfillments/default/badfeelingIntent');
const f_overviewIntent = require('./fulfillments/default/overviewIntent');


// app.get('/error', function (req, res) {
//     res.sendFile(path.join(__dirname + '/public/pages/error.html'));
// });
//
// app.get('/ati', function (req, res) {
//     res.sendFile(path.join(__dirname + '/public/forms/ati-ci.html'));
//     //__dirname : It will resolve to your project folder.
// });

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });
//
// app.get('/exit', function (req, res) {
//     res.sendFile(path.join(__dirname + '/public/forms/resque.html'));
// });

app.post('/', express.json(), (req, res) => {

    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();

    intentMap.set('Default Welcome Intent', f_welcome.fulfillment);
    intentMap.set('Default Fallback Intent', f_fallback.fulfillment);
    intentMap.set('nameIntent', f_name.fulfillment);
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
    intentMap.set('feelingIntent', f_feeling.fulfillment);
    intentMap.set('feelingIntent - yes', f_feeling_yes.fulfillment);
    intentMap.set('feelingIntent - no', f_feeling_no.fulfillment);
    intentMap.set('badfeelingIntent', f_badfeeling.fulfillment);
    intentMap.set('overviewIntent', f_overviewIntent.fulfillment);

    // Connect the agent to the intent map
    agent.handleRequest(intentMap);

});


// Startup server on port 8080
console.log(`app listening on port 8080)`);
app.listen(process.env.PORT || 8080);
// Navigate to localhost:8080 in the browser to use dialogflow locally

app.use('/', express.static(path.join(__dirname, 'public')));

console.log(`navigate to: http://localhost:8080/`);
