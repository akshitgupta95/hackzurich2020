const { Card} = require('dialogflow-fulfillment');
const {Payload} =require("dialogflow-fulfillment");
var House = require("./models/house");
var Scenario = require("./models/scenarios");


module.exports = {

    fulfillment: function (agent) {
        let workerIdandSession=JSON.parse(agent.originalRequest.payload.userId);
        return Scenario.findOne({id : workerIdandSession.scenarioId}).populate('correctHouse')
            .then( data => {
        let response = "Okay, ";
        let context = agent.contexts.find(x => x.name === "global");
        let secondtry=false;
        if(context ==null){
            secondtry=true;
            context=agent.contexts.find(x => x.name === "global2");
        }

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
        // if(Firstry)
        //     if(checkConstraints()){
        //
        //     ShowCorrectHouse
        //         end conv
        //     }
        //     else show Incorrect Random house
        //             try again
        // else{
        //     if(checkConstraints)
        //         ShowCorrectHouse
        //             end conv
        //         }
        //     else show Incorrect Random house
        //         end conv
        let foundAllConstraints=false;
        if(!secondtry){
            if(foundAllConstraints){
                //show correct house here and end
                let houseToShow=data.correctHouse;
                showHouseAndEnd(houseToShow,agent);

            }
            else{
                //show random incorrect house here and ask for try again
                let correctHouse=data.correctHouse;
                return House.find({ _id: {$ne: correctHouse._id}})
                    .then(data => {
                        let incorrectHouse=data[Math.floor(Math.random() * data.length)];
                        showHouseAndRetry(incorrectHouse,agent)
                    });

            }
        }
        else{ //second and last try
            if(foundAllConstraints){
                //show correct house here and end
                let houseToShow=data.correctHouse;
                showHouseAndEnd(houseToShow,agent);

            }
        else{
                //show random incorrect house here and end
                let correctHouse=data.correctHouse;
                return House.find({ _id: {$ne: correctHouse._id}})
                    .then(data => {
                        let incorrectHouse= data[Math.floor(Math.random() * data.length)];
                        showHouseAndEnd(incorrectHouse,agent)
                    });
            }

        }



        // if(houseType && houseType.toString().toUpperCase()==="studio".toUpperCase() && context.parameters.registration && context.parameters.supermarkets && duration.toString().toUpperCase()==="1".toUpperCase() && travelTime.toString().toUpperCase()==="10".toUpperCase()) {
        //     if (secondtry) {
        //
        //         agent.add(new Payload(agent.UNSPECIFIED, {
        //             "richContent": [
        //                 [
        //                     {
        //                         "type": "image",
        //                         "rawUrl": "https://www.xior.nl/cache/building/443/thumb/0_400_8-.jpg",
        //                         "accessibilityText": "Dialogflow across platforms"
        //                     },
        //                     {
        //                         "type": "info",
        //                         "title": "Xior Barbarasteeg",
        //                         "subtitle": "Studio with Rent: Euro 440 \n Location: Barbarasteeg 2, Delft \n Minimum Contract: 12 months with Municipality Registration \n Additonals: In front of Delft Station, 8 minutes to TU and near the city centre and the market",
        //                     }
        //                 ]
        //                 ]
        //
        //
        //         }, {sendAsMessage: true, rawPayload: true}));
        //         agent.end("This task is now complete. Click the continue button in left of your screen to proceed");
        //     }
        //
        //
        //      else {
        //         agent.add(new Payload(agent.UNSPECIFIED, {
        //             "richContent": [
        //                 [
        //                     {
        //                         "type": "image",
        //                         "rawUrl": "https://www.xior.nl/cache/building/443/thumb/0_400_8-.jpg",
        //                         "accessibilityText": "Dialogflow across platforms"
        //                     },
        //                     {
        //                         "type": "info",
        //                         "title": "Xior Barbarasteeg",
        //                         "subtitle": "Studio with Rent: Euro 440 \n Location: Barbarasteeg 2, Delft \n Minimum Contract: 12 months with Municipality Registration \n Additonals: In front of Delft Station, 8 minutes to TU and near the city centre and the market",
        //                     }
        //                 ],
        //                 [
        //                     {
        //                         "type": "description",
        //                         "title": "Do you want to submit this task or try again?",
        //                     }
        //
        //                 ],
        //                 [
        //                     {
        //                         "type": "chips",
        //                         "options": [
        //                             {
        //                                 "text": "Submit"
        //                             },
        //                             {
        //                                 "text": "Try Again",
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             ]
        //         }, {sendAsMessage: true, rawPayload: true}));
        //     }
        // }
        // else {
        //     if(secondtry){
        //         agent.add(new Payload(agent.UNSPECIFIED, {
        //             "richContent": [
        //                 [
        //                     {
        //                         "type": "image",
        //                         "rawUrl": "https://www.duwo.nl/typo3temp/assets/_processed_/e/4/csm_image_242c92203779372268c56935ccaa57ab_005_roland_holstlaan_p1020792020_2364ec3ebe.jpg",
        //                         "accessibilityText": "Dialogflow across platforms"
        //                     },
        //                     {
        //                         "type": "info",
        //                         "title": "Roland Holstlaan",
        //                         "subtitle": "Studio with Rent: Euro 500 \n Location: Roland Holstlaan, Delft  \n Additonals: Near Delft South, 12 minutes to TU",
        //                     }
        //                 ]
        //             ]
        //
        //         }, {sendAsMessage: true, rawPayload: true}));
        //         agent.end("This task is now complete. Click the continue button in left of your screen to proceed");
        //
        //     }
        //     else {
        //         agent.add(new Payload(agent.UNSPECIFIED, {
        //             "richContent": [
        //                 [
        //                     {
        //                         "type": "image",
        //                         "rawUrl": "https://www.duwo.nl/typo3temp/assets/_processed_/e/4/csm_image_242c92203779372268c56935ccaa57ab_005_roland_holstlaan_p1020792020_2364ec3ebe.jpg",
        //                         "accessibilityText": "Dialogflow across platforms"
        //                     },
        //                     {
        //                         "type": "info",
        //                         "title": "Roland Holstlaan",
        //                         "subtitle": "Studio with Rent: Euro 500 \n Location: Roland Holstlaan, Delft  \n Additonals: Near Delft South, 12 minutes to TU",
        //                     }
        //                 ],
        //                 [
        //                     {
        //                         "type": "description",
        //                         "title": "Do you want to submit this task or try again?",
        //                     }
        //
        //                 ],
        //                 [
        //                     {
        //                         "type": "chips",
        //                         "options": [
        //                             {
        //                                 "text": "Submit"
        //                             },
        //                             {
        //                                 "text": "Try Again",
        //                             }
        //                         ]
        //                     }
        //                 ]
        //
        //             ],
        //
        //         }, {sendAsMessage: true, rawPayload: true}));
        //     }
        // }

    });
    }

};

function showHouseAndEnd(house,agent) {
    console.log(house.url);
    agent.add(new Payload(agent.UNSPECIFIED, {
        "richContent": [
            [
                {
                    "type": "image",
                    "rawUrl": house.url,
                    "accessibilityText": "the shown house"
                },
                {
                    "type": "info",
                    "title": house.name,
                    "subtitle": house.summary.toString()
                }
            ]
        ]


    }, {sendAsMessage: true, rawPayload: true}));
    agent.end("This task is now complete. Click the continue button in left of your screen to proceed");
}

function showHouseAndRetry(house,agent) {
    agent.add(new Payload(agent.UNSPECIFIED, {
        "richContent": [
            [
                {
                    "type": "image",
                    "rawUrl": house.url,
                    "accessibilityText": "the shown house"
                },
                {
                    "type": "info",
                    "title": house.name,
                    "subtitle": house.summary
                }
            ],
            [
                {
                    "type": "description",
                    "title": "Do you want to submit this task or try again?",
                }

            ],
            [
                {
                    "type": "chips",
                    "options": [
                        {
                            "text": "Submit"
                        },
                        {
                            "text": "Try Again",
                        }
                    ]
                }
            ]
        ]
    }, {sendAsMessage: true, rawPayload: true}));
}
