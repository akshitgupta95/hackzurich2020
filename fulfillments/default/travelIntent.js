
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        let travelTime=agent.parameters.travelTime.amount;
        let unit=agent.parameters.travelTime.unit;

        agent.add(`Sure, I will find options near the university with less than ${travelTime} ${unit} travel. What other preferences do you have?`);
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
