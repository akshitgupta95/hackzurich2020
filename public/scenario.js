
let params = (new URL(document.location)).searchParams;
let scenario=params.get("sid");
let scenarioText = document.getElementById('scenario');
fetch('/getScenario?sid='+scenario)
    .then(response => response.json())
    .then(data => {console.log(data);
        scenarioText.innerHTML=data.description});