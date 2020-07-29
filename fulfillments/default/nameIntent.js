

module.exports = {

    fulfillment: function (agent) {
        let name=agent.parameters.givenName;
        agent.add(`Hi ${name}, Nice to meet you. So, Tell me, are you looking for a studio, private room or shared room in Delft?`);
    }

};
