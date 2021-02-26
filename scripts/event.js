var eventName;

window.addEventListener('load', function () {
    var urlParams = new URLSearchParams(decodeURIComponent(window.location.search));
    eventName = urlParams.get('event');

    populateEventPage();
});

function populateEventPage() {
    let eventTitle = document.getElementById("title");
    let eventDescription = document.getElementById("description");

    let infoName = document.getElementById("info-name");
    let infoImage = document.getElementById("info-image");

    const event = eventData["events"][eventName];

    eventTitle.innerHTML = eventName;
    eventDescription.innerHTML = event["description"];

    infoName.innerHTML = eventName;
    infoImage.src = event["image"];

    var createdTypes = [];

    `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/g9oWz2YzCFM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `

    for (const resource of event["resources"]) {
        var resourceHTML = ``;

        if (resource["type"] == "Videos") {
            resourceHTML = `
                <div class="resource ${resource["type"].split(" ").join("-")}"">
                    <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/${resource["link"]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            `;
        } else {
            resourceHTML = `
                <div class="resource ${resource["type"].split(" ").join("-")}" onclick="window.open('${resource["link"]}')">
                    &rarr;            <a>${resource["title"]}</a>
                </div>
            `;
        }

        if (!createdTypes.includes(resource["type"])) {
            let resourceTypeHTML = `
                <div id="${resource["type"]}" class="resourceType">
                    <h5>${resource["type"]}</h5>
                </div>
            `;

            createdTypes += resource["type"];

            document.getElementById("resources").innerHTML += resourceTypeHTML;
        }

        document.getElementById(resource["type"]).innerHTML += resourceHTML;
    }
}