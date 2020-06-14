

module.exports = {

    fulfillment: function (agent) {
        let duration=agent.parameters.duration.amount;
        let unit=agent.parameters.duration.unit;

        agent.add(`Got it, ${duration} ${unit}, do you have any more preferences?`);
    }

};
