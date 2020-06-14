const { Card} = require('dialogflow-fulfillment');

module.exports = {

    fulfillment: function (agent) {
        let response = "Okay, ";
        let context = agent.contexts["0"];
        let givenName = context.parameters.givenName;
        response=response+givenName+", for the contraints of,\n";
        let houseType = context.parameters.housetype;
        response=response+"House Type: "+houseType;
        if (context.parameters.travelTime != null) {
            let travelTime = context.parameters.travelTime.amount;
            response=response+"\n Commute Time: "+travelTime;
            let travelTimeunit = context.parameters.travelTime.unit;
            response=response+travelTimeunit;
        }
        if (context.parameters.duration != null) {
            let duration = context.parameters.duration.amount;
            response=response+"\n Stay period: "+duration;
            let durationunit = context.parameters.duration.unit;
            response=response+durationunit;
        }
        if (context.parameters.number != null) {
            let amount = context.parameters.number;
            response=response+"\n Rent: Euro"+ amount;
        }
        if(context.parameters.registration){
            response=response+"\n Municipality Registration: Required"
        }
        if(context.parameters.supermarkets){
            response=response+"\n Nearby Supermarkets: Required"
        }
        agent.add(response);
        agent.add("I suggest the following options for you.");
        agent.add("1. Xior Barbarasteeg\n Rent: Euro 440 \n Location: Barbarasteed 2C2, Delft \n Additonals: In front of Delft Station, 8 minutes to TU" );
        agent.add("2. Roland Holstlaan\n Rent: Euro 500 \n Location: Roland Holstlaan, Delft \n Additonals: Near Delft South, 12 minutes to TU");
        agent.end("Hope you like these. Have a nice Day!");

    }

};
