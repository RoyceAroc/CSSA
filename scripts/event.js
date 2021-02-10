var eventName;

window.addEventListener('load', function () {
    var urlParams = new URLSearchParams(decodeURIComponent(window.location.search));
    eventName = urlParams.get('event');
    console.log(eventName)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            populateEventPage(xhttp.responseText);
        }
    };

    xhttp.open("GET", "https://www.cssa.dev/xml/eventData.xml", true);
    xhttp.send();
});

function populateEventPage(eventData) {
    let eventTitle = document.getElementById("title");
    let eventDescription = document.getElementById("description");

    let infoName = document.getElementById("info-name");
    let infoImage = document.getElementById("info-image");
    // Other fields...

    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(eventData, "text/xml");
    
    var doc = $.parseXML(document.body);
    $xml = $(doc);
    $title = $xml.find("events");
    console.log($title.text());

    var nodes = xml.evaluate("events/event", eventData, null, XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();
    while (result) {
        txt += result.childNodes[0].nodeValue + "<br>";
        result = nodes.iterateNext();
    } 

    for (events of xmlDoc.getElementsByTagName("events")) {
        for (let i in events.childNodes) {
            if (i % 2 == 1 && events.childNodes[i].childNodes[1].innerHTML == eventName) {
                var e = events.childNodes[i];
                console.log(e.childNodes);

                eventTitle.innerHTML = eventName;
                eventDescription.innerHTML = e.childNodes[9].innerHTML;

                infoName.innerHTML = eventName;
                infoImage.src = e.childNodes[3].innerHTML;
            }
        }
    }
}