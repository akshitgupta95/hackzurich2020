
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        let feelingType=agent.parameters.feeling;
        // agent.add(`Okay! so, you are feeling ${feelingType}.`);
        if(feelingType.toString().toUpperCase()==="GOOD"){
            agent.add(`Go to Test here`);
        }
        else if(feelingType.toString().toUpperCase()==="BAD"){
            //store to db here
            agent.add(`Why are you feeling bad`);
            agent.add(new Payload(agent.UNSPECIFIED,{
                "richContent": [
                    [
                        {
                            "type": "chips",
                            "options": [
                                {
                                    "text": "Tired"
                                },
                                {
                                    "text": "Hungry",
                                },
                                {
                                    "text": "bad",
                                }
                            ]
                        }
                    ]
                ]
            },{ sendAsMessage: true, rawPayload: true }));
        }
        else{//user feeling okay
            agent.add(`Show okay suggestion here`);
        }


    }

};
