
const {Payload} =require("dialogflow-fulfillment");
var User = require("./models/user");
module.exports = {

    fulfillment: async function (agent) {
        

        if (agent.requestSource === "TELEGRAM") {
            let name=agent.parameters.name;
            let userID = agent.originalRequest.payload.data.from.username;
            let nameInstance = new User({ userId: userID, name:name });
            // Save thefeelingInstance to the database
            await nameInstance.save(function (err) {
                    if (err) return console.log(err);
                }
            );
            agent.add(`Hi ${name}, Nice to meet you. So, Tell me, How are you feeling today ?`);

            agent.add(new Payload(agent.TELEGRAM,{
                "telegram": {
                    "text": "'Pick your feeling'",
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
        } else {
            let name=agent.parameters.name;
            let nameInstance = new User({ userId: "ABC", name:name });
            // Save thefeelingInstance to the database
            await nameInstance.save(function (err) {
                    if (err) return console.log(err);
                }
            );
            agent.add(`Hi ${name}, Nice to meet you. So, Tell me, How are you feeling today ?`);

            agent.add(new Payload(agent.UNSPECIFIED,{
            "richContent": [
                [{
                    "text": "'Pick your feeling'",
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
                ]
            ]
        },{ sendAsMessage: true, rawPayload: true }));
        }

    }

};
