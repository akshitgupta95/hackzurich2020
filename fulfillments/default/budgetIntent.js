

module.exports = {

    fulfillment: function (agent) {
        let amount=agent.parameters.number;

        agent.add(`Got it, ${amount} Euros. Any more constraints you would like me to know about?`);
    }

};
