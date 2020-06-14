

module.exports = {

    fulfillment: function (agent) {
        // agent.user.storage.supermarket=``;
        let context = agent.contexts["0"];
        let parameters=context.parameters;
        parameters.supermarkets=true;
        agent.context.set('global', 10, parameters);
        agent.add(`Got you, Do you have any more preferences?`);
    }

};
