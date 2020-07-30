
module.exports = {

    fulfillment: function (agent) {

        let name=agent.context.get("global").parameters.givenName;
        agent.setContext({'name': 'global', 'lifespan': -1, 'parameters': {'givenName': 'Rome'}});
        agent.setContext({'name': 'global2', 'lifespan': 40, 'parameters': {'givenName': name}})
        agent.setFollowupEvent("RESTART");
        agent.add("restarting journey!");

    }

};
