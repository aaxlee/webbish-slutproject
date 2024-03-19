const neoButton = document.getElementById("buttonNEO");
const apodButton = document.getElementById("buttonAPOD");
const icon = document.getElelentById("icon");

let result = document.getElementById("result");
let res = document.getElementById("res");

let apodWindow = document.getElementById("pop-up-APOD");
let neoWindow = document.getElementById("pop-up-NEO");
let closeApod = document.getElementById("close-APOD");
let closeNeo = document.getElementById("close-NEO");

const apiKey = "vfr5FTFGczcXErWDkr0Se9HCgiWwoABSdeFpTDG8";
// NEO (Near Earth Objects)
const neoUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;
// APOD (Astronomy Picture Of The Day)
const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`; 

async function fetchNeo() {
    const response = await fetch(neoUrl);
    const data = await response.json();
    return data;
}

async function fetchAPOD() {
    const response = await fetch(apodUrl);
    const data = await response.json();
    return data;
}

function displayNeo(data) {
    // TODO: ge bättre namn på variabler / dela upp i funktioner för att kunna läsa enklre
    console.log(data);
    let neoObjects = data.near_earth_objects;
    neoObjects.forEach(object => {

        let node = document.createElement("div");
        node.innerHTML = `
        <h2>${object.name}</h2>
        <h3>Estimated diameter (km):</h3>
        <p>${object.estimated_diameter.kilometers.estimated_diameter_min} - ${object.estimated_diameter.kilometers.estimated_diameter_max}</p>
        <h3>Potential Danger: </h3>
        <p>${object.is_potentially_hazardous_asteroid}</p>
        <h3>Close approaches:</h3>`;

        let closeApproachData = object.close_approach_data;
        let closeApproaches = document.createElement("div");

        closeApproachData.forEach(data => {
            let item = document.createElement("div");
            item.innerHTML = `
            <h4>${data.close_approach_date_full}</h4>
            <p>Relative Speed: ${data.relative_velocity.kilometers_per_second} km/s</p>`;
            closeApproaches.appendChild(item);
        });

        node.appendChild(closeApproaches);
        result.appendChild(node);
    });
}

function displayApod(data) {
    const url = data.hdurl;
    console.log(url);
    const img = document.createElement("img");
    img.src = url;
    res.appendChild(img);
}

icon.addEventListener("click", function(e) {
    e.preventDefault();
})
// tutorial för pop-up fönster: https://www.linkedin.com/advice/3/how-can-you-create-pop-up-window-html-javascript-skills-html
apodButton.addEventListener("click", function(e) {
    e.preventDefault();
    apodWindow.style.display = "block";
});
closeApod.addEventListener("click", function(e) {
    apodWindow.style.display = "none";
});
neoButton.addEventListener("click", function(e) {
    e.preventDefault();
    neoWindow.style.display = "block";
});
closeNeo.addEventListener("click", function(e) {
    neoWindow.style.display = "none";
});

// neoButton.onclick = async function() {
//     const NEO = await fetchNeo();
//     displayNeo(NEO);
// }

// apodButton.onclick = async function() {
//     const APOD = await fetchAPOD();
//     displayApod(APOD);
// }