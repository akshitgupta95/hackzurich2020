
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        let duration=agent.parameters.duration.amount;
        let unit=agent.parameters.duration.unit;

        agent.add(`Got it, ${duration} ${unit}. What other preferences do you have?`);
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
