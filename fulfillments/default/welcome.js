/**
 * Intent: Default Welcome Intent
 * Fulfillment: default
 */


const {Payload} =require("dialogflow-fulfillment");

module.exports = {

  fulfillment: function (agent) {
    agent.add('Hi! My name is Alex from Roche and I am here to help you. What\'s your name?');
  }

};
