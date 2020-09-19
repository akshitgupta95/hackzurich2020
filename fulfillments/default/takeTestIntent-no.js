
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
                        "rawUrl": "https://github.com/akshitgupta95/hackzurich2020/blob/master/images/JoBrownBear-AgADhQUAAj-VzAo.gif",
                    },
                    {
                        "type": "info",
                        "title": "Really?",
                        "subtitle": "The test can give you valuable insight into your health. Next time don't back out!",
                    }
                ]
                ]


        }, {sendAsMessage: true, rawPayload: true}));
        agent.end("This task is now complete. Click the continue button in left of your screen to proceed");
       
    }

};
