window.onload = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            populateEventPage(xhttp.responseText);
        }
    };

    xhttp.open("GET", "eventData.html", true);
    xhttp.send();
}

function populateCompetitionPage(eventData) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(eventData,"text/xml");

    xmlDoc.getElementsByTagName("event").forEach((event) => {
        let eventHTML = `
            <div class="event">
                <img class="event-image" src="${event.childNodes[1].nodeValue}" alt="...">

                <div id="event-text">
                    <h4 id="event-title">${event.childNodes[0].nodeValue}</h4>
                    <p id="event-description">${event.childNodes[4].nodeValue}</p>
                </div>
            </div>
        `;

        document.getElementById("eventsCollapsible").innerHTML += eventHTML;
    });
}