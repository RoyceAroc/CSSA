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

    for (const resource of event["resources"]) {
        let resourceHTML = `
            <div class="resource" onclick="window.open('${resource["link"]}')">
                &rarr;            <a>${resource["title"]}</a>
            </div>
        `;

        if (!createdTypes.includes(resource["type"])) {
            let resourceTypeHTML = `
                <div id="${resource["type"]}" class="resourceType">
                    <h5>${resource["type"]}</h5>
                </div>
            `;

            document.getElementById("resources").innerHTML += resourceTypeHTML;
        }

        document.getElementById(resource["type"]).innerHTML += resourceHTML;
    }
}