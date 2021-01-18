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

    for (events of xmlDoc.getElementsByTagName("events")) {
        for (i in events.childNodes) {
            if (i % 2 == 1) {
                let e = events.childNodes[i];

                console.log(e.childNodes[3].nodeValue);
    
                let eventHTML = `
                    <div class="event">
                        <img class="event-image" src="${e.childNodes[3].innerHTML}" alt="...">
        
                        <div id="event-text">
                            <h4 id="event-title">${e.childNodes[1].innerHTML}</h4>
                            <p id="event-description">${e.childNodes[9].innerHTML}</p>
                        </div>
                    </div>
                `;
        
                document.getElementById("eventsCollapsible").innerHTML += eventHTML;
            }
        }
    }
}