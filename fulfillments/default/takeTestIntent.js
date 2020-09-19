var Feeling = require("./models/feelings");

const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: async function (agent) {
        let feelingType=agent.parameters.feeling;
        var userID = agent.originalRequest.payload.data.callback_query.from.username;
        var feelingInstance = new Feeling({ userID: userID, feeling: feelingType.toString().toUpperCase(), date: Date.now() });

        // Save thefeelingInstance to the database
        await feelingInstance.save(function (err) {
            if (err) return console.log(err);
        }
        );

        if(feelingType.toString().toUpperCase()==="GOOD"){
            agent.add(`Nice to hear that`);
            if (agent.requestSource == "TELEGRAM") {
              agent.add(new Payload(agent.TELEGRAM,{
                  "telegram": {
                      "text": "'Would you like to take test your glucose level?'",
                      "reply_markup": {
                        "inline_keyboard": [
                          [
                            {
                              "text": "Yes",
                              "callback_data": "yes"
                            }
                          ],
                          [
                            {
                              "text": "No",
                              "callback_data": "no"
                            }
                          ]
                        ]
                      }
                    }
              },{ sendAsMessage: true, rawPayload: true }));
            } else {
              agent.add(new Payload(agent.UNSPECIFIED,{
                "richContent": [
                    [{
                      "text": "'Would you like to take test your glucose level?'",
                      "reply_markup": {
                        "inline_keyboard": [
                          [
                            {
                              "text": "Yes",
                              "callback_data": "yes"
                            }
                          ],
                          [
                            {
                              "text": "No",
                              "callback_data": "no"
                            }
                          ]
                        ]
                      }
                    }
                    ]
                ]
            },{ sendAsMessage: true, rawPayload: true }));
            }
        }
        else if(feelingType.toString().toUpperCase()==="BAD"){
            agent.add(`Why are you feeling bad?`);
            agent.add(new Payload(agent.UNSPECIFIED,{
                "richContent": [
                    [
                        {
                            "type": "chips",
                            "options": [
                                {
                                    "text": "I'm Tired"
                                },
                                {
                                    "text": "I'm Hungry",
                                },
                                {
                                    "text": "I'm Stressed",
                                }
                            ]
                        }
                    ]
                ]
            },{ sendAsMessage: true, rawPayload: true }));
        }
        else{//user feeling okay
            agent.add(`Show okay suggestions here`);
        }
    }
};

function testMongoDB() {
var Schema = mongoose.Schema;
var FeelingsSchema = new Schema({
  feeling: String,
  date: String,
},
{collection: "users"});

var feeling_model = mongoose.model('Feeling', FeelingsSchema );

// Create an instance of model SomeModel
var awesome_instance = new feeling_model({ feeling: 'very good', date: '19:9.' });

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return console.log(err);
  // saved!
});
}