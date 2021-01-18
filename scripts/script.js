var eventName;

window.onload = function () {
    var navxhttp = new XMLHttpRequest();
    navxhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByTagName("nav")[0].innerHTML += navxhttp.responseText;
        }
    };

    navxhttp.open("GET", "navbar.html", true);
    navxhttp.send();
    
    var urlParams = new URLSearchParams(decodeURIComponent(window.location.search));
    eventName = urlParams.get('event');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            populateEventPage(this.responseText);
            populateEventPage(eventData)
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