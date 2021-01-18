window.onload = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            populateCompetitionPage(xhttp.responseText);
        }
    };

    xhttp.open("GET", "./xml/eventData.xml", true);
    xhttp.send();
}

function populateCompetitionPage(eventData) {
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(eventData, "text/xml");

    for (events of xmlDoc.getElementsByTagName("event")) {
        console.log(events.childNodes);

        let eventHTML = `
            <div class="event">
                <img class="event-image" src="{events.childNodes[1].nodeValue}" alt="...">

                <div id="event-text">
                    <h4 id="event-title">${events.childNodes[0].nodeValue}</h4>
                    <p id="event-description">${events.childNodes[4].nodeValue}</p>
                </div>
            </div>
        `;

        document.getElementById("eventsCollapsible").innerHTML += eventHTML;
    }
}