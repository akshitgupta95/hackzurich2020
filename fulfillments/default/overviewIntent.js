
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        // agent.user.storage.supermarket=``;

        agent.add(`Here is the overview for you.`);
        //make image from db here
        agent.add(`show image here`);
        agent.end("Have a nice Day!");
        // agent.add(new Payload(agent.UNSPECIFIED,{
        //     "richContent": [
        //         [
        //             {
        //                 "type": "chips",
        //                 "options": [
        //                     {
        //                         "text": "Municipality Registration"
        //                     },
        //                     {
        //                         "text": "Travel Time",
        //                     },
        //                     {
        //                         "text": "Max Budget",
        //                     },
        //                     {
        //                         "text": "Rent Duration",
        //                     },
        //                     {
        //                         "text": "No other preference",
        //                     }
        //                 ]
        //             }
        //         ]
        //     ]
        // },{ sendAsMessage: true, rawPayload: true }));
    }

};
