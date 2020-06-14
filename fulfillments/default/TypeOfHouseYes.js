

module.exports = {

    fulfillment: function (agent) {
        let context = agent.contexts["0"];
        let parameters=context.parameters;
        parameters.registration=true;
        agent.context.set('global', 10, parameters);
        agent.add(`Sure, do you have any more constraints?`);
    }

};
