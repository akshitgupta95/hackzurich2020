

module.exports = {

    fulfillment: function (agent) {
        let travelTime=agent.parameters.travelTime.amount;
        let unit=agent.parameters.travelTime.unit;

        agent.add(`Sure, I will find options near the university with less than ${travelTime} ${unit} travel, do you have any more preferences?`);
    }

};
