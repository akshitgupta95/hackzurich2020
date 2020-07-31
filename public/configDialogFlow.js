let params = (new URL(document.location)).searchParams;
let workerID = params.get("workerId");
console.log(workerID);
const dfMessenger = document.querySelector('df-messenger');
dfMessenger.setAttribute("user-id",workerID.toString());