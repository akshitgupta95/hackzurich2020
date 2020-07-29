const { Card} = require('dialogflow-fulfillment');
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        let response = "Okay, ";
        let context = agent.contexts["0"];
        let givenName = context.parameters.givenName;
        response=response+givenName+", for the contraints of,\n";
        let houseType = context.parameters.housetype;
        response=response+"House Type: "+houseType;
        if (context.parameters.travelTime != null) {
            var travelTime = context.parameters.travelTime.amount;
            response=response+"\n Commute Time: "+travelTime;
            let travelTimeunit = context.parameters.travelTime.unit;
            response=response+travelTimeunit;
        }
        if (context.parameters.duration != null) {
            var duration = context.parameters.duration.amount;
            response=response+"\n Stay period: "+duration;
            let durationunit = context.parameters.duration.unit;
            response=response+durationunit;
        }
        if (context.parameters.number != null) {
            var amount = context.parameters.number;
            response=response+"\n Rent: Euro"+ amount;
        }
        if(context.parameters.registration){
            response=response+"\n Municipality Registration: Required"
        }
        if(context.parameters.supermarkets){
            response=response+"\n Nearby Supermarkets: Required"
        }

        agent.add("[debug]"+response);
        agent.add("I suggest the following option for you.");
        if(houseType.toString().toUpperCase()==="studio".toUpperCase() && context.parameters.registration && context.parameters.supermarkets && duration.toString().toUpperCase()==="1".toUpperCase() && travelTime.toString().toUpperCase()==="10".toUpperCase()) {
            agent.add(new Payload(agent.UNSPECIFIED, {
                "richContent": [
                    [
                        {
                            "type": "image",
                            "rawUrl": "https://www.xior.nl/cache/building/443/thumb/0_400_8-.jpg",
                            "accessibilityText": "Dialogflow across platforms"
                        },
                        {
                            "type": "info",
                            "title": "Xior Barbarasteeg",
                            "subtitle": "Studio with Rent: Euro 440 \n Location: Barbarasteeg 2, Delft \n Minimum Contract: 12 months with Municipality Registration \n Additonals: In front of Delft Station, 8 minutes to TU and near the city centre and the market",
                        }
                    ]
                ]
            }, {sendAsMessage: true, rawPayload: true}));
        }
        else {
            agent.add(new Payload(agent.UNSPECIFIED, {
                "richContent": [
                    [
                        {
                            "type": "image",
                            "rawUrl": "https://www.duwo.nl/typo3temp/assets/_processed_/e/4/csm_image_242c92203779372268c56935ccaa57ab_005_roland_holstlaan_p1020792020_2364ec3ebe.jpg",
                            "accessibilityText": "Dialogflow across platforms"
                        },
                        {
                            "type": "info",
                            "title": "Roland Holstlaan",
                            "subtitle": "Studio with Rent: Euro 500 \n Location: Roland Holstlaan, Delft  \n Additonals: Near Delft South, 12 minutes to TU",
                        }
                    ]
                ]
            }, {sendAsMessage: true, rawPayload: true}));

        }
        // agent.add("1. Xior Barbarasteeg\n Rent: Euro 440 \n Location: Barbarasteed 2C2, Delft \n Additonals: In front of Delft Station, 8 minutes to TU" );
        // agent.add("2. Roland Holstlaan\n Rent: Euro 500 \n Location: Roland Holstlaan, Delft \n Additonals: Near Delft South, 12 minutes to TU");
        agent.add("Hope you like it. Have a nice Day!");
        agent.end("This task is now complete. Click the continue button in left of your screen to proceed");
        // agent.end(new Payload(agent.SLACK,{
        //     "richContent": [
        //         [
        //             {
        //                 "type": "button",
        //                 "icon": {
        //                     "type": "chevron_right",
        //                     "color": "#FF9800"
        //                 },
        //                 "text": "Proceed",
        //                 "link": "https://fs11.formsite.com/V9PQWO/hnvnvvqayi/index.html",
        //                 "event": {
        //                     "name": "",
        //                     "languageCode": "",
        //                     "parameters": {}
        //                 }
        //             }
        //         ]
        //     ]
        // },{ sendAsMessage: true, rawPayload: true }));

    }

};
