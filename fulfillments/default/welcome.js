/**
 * Intent: Default Welcome Intent
 * Fulfillment: default
 */

var User = require("./models/user");
const {Payload} =require("dialogflow-fulfillment");

module.exports = {

  fulfillment: function (agent) {
    if (agent.requestSource === "TELEGRAM") {
      var userID = agent.originalRequest.payload.data.from.username;
      let name=agent.originalRequest.payload.data.from.first_name;
      return User.findOne({userId: userID})
          .then(data => {
            if(data!=null){
  
              agent.add(`Welcome back ${name}! Alex here from Roche for your help. How are you feeling today?`);
              agent.add(new Payload(agent.TELEGRAM,{
                "telegram": {
                  "text": "'Pick your closest feeling'",
                  "reply_markup": {
                    "inline_keyboard": [
                      [
                        {
                          "text": "Good",
                          "callback_data": "Good"
                        }
                      ],
                      [
                        {
                          "text": "Okay",
                          "callback_data": "Okay"
                        }
                      ],
                      [
                        {
                          "text": "Bad",
                          "callback_data": "Bad"
                        }
                      ]
                    ]
                  }
                }
              },{ sendAsMessage: true, rawPayload: true }));
            }
            else{
              agent.add(`Hi ${name}! My name is Alex from Roche and I am here to help you. What\'s your Doctor's name?`);
            }
          });
  } else {
      agent.add(new Payload(agent.UNSPECIFIED, {
          "image": {
              "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png"
          }
          }
      , {sendAsMessage: true, rawPayload: true}));

      let name=agent.originalRequest.payload.data.from.first_name;
      return User.findOne({userId: "ABC"})
          .then(data => {
            if(data!=null){
  
              agent.add(`Welcome back ${name}! Alex here from Roche for your help. How are you feeling today?`);

              agent.add(new Payload(agent.UNSPECIFIED,{
                "richContent": [
                    [{
                      "text": "'Pick your closest feeling'",
                      "reply_markup": {
                        "inline_keyboard": [
                          [
                            {
                              "text": "Good",
                              "callback_data": "Good"
                            }
                          ],
                          [
                            {
                              "text": "Okay",
                              "callback_data": "Okay"
                            }
                          ],
                          [
                            {
                              "text": "Bad",
                              "callback_data": "Bad"
                            }
                          ]
                        ]
                      }
                    }]
                ]
          },{ sendAsMessage: true, rawPayload: true }));
            }
            else{
              agent.add(`Hi ${name}! My name is Alex from Roche and I am here to help you. What\'s your Doctor's name?`);
            }
          });
  }
  }
};
