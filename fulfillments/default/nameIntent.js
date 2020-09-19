
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        let name=agent.parameters.name;
        agent.add(`Hi ${name}, Nice to meet you. So, Tell me, How are you feeling today ?`);
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
