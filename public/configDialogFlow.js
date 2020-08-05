
let workerID = params.get("wid");
const dfMessenger = document.querySelector('df-messenger');
if(workerID!=null && scenario!=null) {
    let serialised={"workerId":workerID.toString(),"scenarioId":scenario.toString()};
    dfMessenger.setAttribute("user-id", JSON.stringify(serialised));
}

