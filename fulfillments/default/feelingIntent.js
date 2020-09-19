
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        let feelingType=agent.parameters.feeling;
        // agent.add(`Okay! so, you are feeling ${feelingType}.`);
        if(feelingType.toString().toUpperCase()==="GOOD"){
            agent.add(`Nice to hear that`);
            agent.add('Would you like to take test your glucose level?');
            agent.add(new Payload(agent.UNSPECIFIED,{
                "richContent": [
                    [
                        {
                            "type": "chips",
                            "options": [
                                {
                                    "text": "Yes"
                                },
                                {
                                    "text": "No, I am fine",
                                }
                            ]
                        }
                    ]
                ]
            },{ sendAsMessage: true, rawPayload: true }));

        }
        else if(feelingType.toString().toUpperCase()==="BAD"){
            //store to db here
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
