
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {

        agent.add('Thanks for taking a test');
        agent.add('show overview image here');
        agent.add("Have a Nice Day!");

    }

};
