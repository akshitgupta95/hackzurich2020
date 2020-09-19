
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        let name=agent.parameters.name;
        agent.add(`Hi ${name}, Nice to meet you. So, Tell me, How are you feeling today ?`);
      // agent.add(new Payload(agent.TELEGRAM, {
      //           "text": "Pick a color",
      //           "reply_markup": {
      //               "keyboard": [
      //                   [
      //                       {
      //                           "text": "Red",
      //                           "callback_data": "Red"
      //                       }
      //                   ],
      //                   [
      //                       {
      //                           "text": "Green",
      //                           "callback_data": "Green"
      //                       }
      //                   ],
      //                   [
      //                       {
      //                           "text": "Yellow",
      //                           "callback_data": "Yellow"
      //                       }
      //                   ],
      //                   [
      //                       {
      //                           "text": "Blue",
      //                           "callback_data": "Blue"
      //                       }
      //                   ],
      //                   [
      //                       {
      //                           "text": "Pink",
      //                           "callback_data": "Pink"
      //                       }
      //                   ]
      //               ]
      //           }
      //       }));


             // { sendAsMessage: true, rawPayload: true });
        // agent.add(telegramPayload);
        agent.add(new Payload(agent.UNSPECIFIED,{
            "richContent": [
                [
                    {
                        "type": "chips",
                        "options": [
                            {
                                "text": "Good"
                            },
                            {
                                "text": "Okay",
                            },
                            {
                                "text": "Bad",
                            }
                        ]
                    }
                ]
            ]
        },{ sendAsMessage: true, rawPayload: true }));
    }

};
