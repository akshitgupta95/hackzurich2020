
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        agent.add('Sure, Got it.');
        agent.add('show overview image here');
        agent.add("Have a Nice Day!");
    }

};
