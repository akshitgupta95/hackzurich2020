
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        // agent.add('Sure, Got it.');
        // agent.add('show overview image here');
        // agent.add("Have a Nice Day!");

    
        if (agent.requestSource == "TELEGRAM") {
            agent.add(new Payload(agent.TELEGRAM, {
                "image": {
                    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png"
                }
                }
            , {sendAsMessage: true, rawPayload: true}));
        } else {
            agent.add(new Payload(agent.UNSPECIFIED, {
                "image": {
                    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png"
                }
                }
            , {sendAsMessage: true, rawPayload: true}));
        }

        agent.end("This task is now complete. Click the continue button in left of your screen to proceed");
       
    }

};
