const apiKey = "vfr5FTFGczcXErWDkr0Se9HCgiWwoABSdeFpTDG8";
let result = document.getElementById("result");
// NEO (Near Earth Objects)
const neoUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;
// APOD (Astronomy Picture Of The Day)
const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`; 

async function fetchData() {
    const response = await fetch(neoUrl);
    const data = await response.json();
    return data;
}

function displayNeo(data) {
    // TODO: ge bättre namn på variabler / dela upp i funktioner för att kunna läsa enklre
    console.log(data);
    let objects = data.near_earth_objects;
    objects.forEach(object => {
        // add the name of the object
        let node = document.createElement("div");
        node.innerHTML = `
        <h2>${object.name}</h2>
        <h3>Estimated diameter (km):</h3>
        <p>${object.estimated_diameter.kilometers.estimated_diameter_min} - ${object.estimated_diameter.kilometers.estimated_diameter_max}</p>
        <h3>Potential Danger: </h3>
        <p>${object.is_potentially_hazardous_asteroid}</p>
        <h3>Close approaches:</h3>`;

        // approach data
        let closeApproachData = object.close_approach_data;
        let node2 = document.createElement("p");
        closeApproachData.forEach(data => {
            let node3 = document.createElement("p");
            node3.innerHTML = `
            <h4>${data.close_approach_date_full}</h4>
            <p>Relative Speed: ${data.relative_velocity.kilometers_per_second} km/s</p>`;
            node2.appendChild(node3);
        });
        node.appendChild(node2);
        result.appendChild(node);
    });
}

window.onload = async function() {
    const data = await fetchData();
    displayNeo(data);
}