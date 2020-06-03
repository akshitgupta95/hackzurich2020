/**
 * Intent: Default Fallback Intent
 * Fulfillment: default
 */

module.exports = {

    fulfillment: function (agent) {
    
        agent.add(
            `I did not get that. Give me a location for the weather or ask me the flight weather.`
        )

    }

}
