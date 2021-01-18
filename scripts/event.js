window.onload = function () {
    var urlParams = new URLSearchParams(decodeURIComponent(window.location.search));
    var event = urlParams.get('event');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            populateEventPage(this.responseText);
        }
    };

    xhttp.open("GET", "https://www.cssa.dev/xml/eventData.xml", true);
    xhttp.send();
}

function populateEventPage(eventData) {
    let eventTitle = document.getElementById("title");
    let eventDescription = document.getElementById("description");

    let infoName = document.getElementById("info-name");
    let infoImage = document.getElementById("info-image");
    // Other fields...


}