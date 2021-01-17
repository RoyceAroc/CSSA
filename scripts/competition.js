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
    let eventTitle = document.getElementById("title");
    let eventDescription = document.getElementById("description");

    let infoName = document.getElementById("info-name");
    let infoImage = document.getElementById("info-image");
    // Other fields...

    
}