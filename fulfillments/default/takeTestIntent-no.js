
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        // agent.add('Sure, Got it.');
        // agent.add('show overview image here');
        // agent.add("Have a Nice Day!");

    
        agent.add(new Payload(agent.UNSPECIFIED, {
            "richContent": [
                [
                    {
                        "type": "image",
                        "rawUrl": "https://www.xior.nl/cache/building/443/thumb/0_400_8-.jpg",
                        "accessibilityText": "Dialogflow across platforms"
                    },
                    {
                        "type": "info",
                        "title": "Xior Barbarasteeg",
                        "subtitle": "Studio with Rent: Euro 440 \n Location: Barbarasteeg 2, Delft \n Minimum Contract: 12 months with Municipality Registration \n Additonals: In front of Delft Station, 8 minutes to TU and near the city centre and the market",
                    }
                ]
                ]


        }, {sendAsMessage: true, rawPayload: true}));
        agent.end("This task is now complete. Click the continue button in left of your screen to proceed");
       
    }

};
