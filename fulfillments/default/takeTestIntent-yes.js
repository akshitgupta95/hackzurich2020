
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {

        agent.add('Thanks for taking a test');
        
        agent.add("Have a Nice Day!");

        
        agent.add(new Payload(agent.TELEGRAM,{
            "image": {
                "imageUri": "https://github.com/akshitgupta95/hackzurich2020/blob/master/images/JoBrownBear-AgADiwUAAj-VzAo.gif"
              }

        }, {sendAsMessage: true, rawPayload: true}));



        if (agent.requestSource == "TELEGRAM") {
            agent.add(new Payload(agent.TELEGRAM,{
                "image": {
                    "imageUri": "https://github.com/akshitgupta95/hackzurich2020/blob/master/images/JoBrownBear-AgADiwUAAj-VzAo.gif"
                  }
            },{ sendAsMessage: true, rawPayload: true }));
          } else {
            agent.add(new Payload(agent.UNSPECIFIED,{
              "richContent": [
                  [           { "image": {
                    "imageUri": "https://github.com/akshitgupta95/hackzurich2020/blob/master/images/JoBrownBear-AgADiwUAAj-VzAo.gif"
                  }}
                  ]
              ]
          },{ sendAsMessage: true, rawPayload: true }));
          }

        agent.end("This task is now complete. Click the continue button in left of your screen to proceed");

    

    }

};
