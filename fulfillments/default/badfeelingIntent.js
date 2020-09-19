
const {Payload} =require("dialogflow-fulfillment");
module.exports = {

    fulfillment: function (agent) {
        let feelingType=agent.parameters.badfeeling;
        // agent.add(`Okay! so, you are feeling ${feelingType}.`);
        if(feelingType.toString().toUpperCase()==="HUNGRY"){
            agent.add(`You should eat something soon else your sugar level may drop.`);
        }
        else if(feelingType.toString().toUpperCase()==="TIRED"){
            //store to db here
            agent.add(`Calm down! I am checking stuff out.`);
            //call db and see how many times this user is tired, else crack a joke
        }
        else{//user feeling okay
            agent.add(`Take a break! Show stressed suggestion here`);
        }


    }

};
