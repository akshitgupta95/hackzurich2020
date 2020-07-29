/**
 * Intent: Default Fallback Intent
 * Fulfillment: default
 */
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
    
        agent.add(
            `I did not get that.`
        );
        agent.add(`What are the other housing preferences do you have?`);
        agent.add(new Payload(agent.UNSPECIFIED,{
            "richContent": [
                [
                    {
                        "type": "chips",
                        "options": [
                            {
                                "text": "Municipality Registration"
                            },
                            {
                                "text": "Travel Time",
                            },
                            {
                                "text": "Max Budget",
                            },
                            {
                                "text": "Rent Duration",
                            },
                            {
                                "text": "Near supermarkets",
                            },
                            {
                                "text": "No other preference",
                            }
                        ]
                    }
                ]
            ]
        },{ sendAsMessage: true, rawPayload: true }));


    }

};
