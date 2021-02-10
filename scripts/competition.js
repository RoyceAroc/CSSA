window.addEventListener('load', function () {
    populateCompetitionPage()
});

function populateCompetitionPage() {
    console.log(eventData["events"])

    for (k of Object.keys(eventData["events"])) {
        let e = eventData["events"][k];
        console.log(k)

        let eventHTML = `
            <div class="event" onclick="window.location='event.html?event=${e["name"]}'">
                <img class="event-image" style="" src="${e["image"]}" alt="...">

                <div id="event-text">
                    <h4 id="event-title">${e["name"]}</h4>
                    <p id="event-description">${e["description"]}</p>
                </div>
            </div>
        `;

        document.getElementById("eventsCollapsible").innerHTML += eventHTML;
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let d = new Date();
    let year = d.getFullYear();
    let month = months[d.getMonth()];
    let day = days[d.getDay()];

    let seed = 7 + d.getDay();

    let startDate = d.getDate() - d.getDay() - 8;

    for (let i = 0; i < 35; i++) {
        document.getElementById(i).innerHTML = (Math.sign((startDate + i) % daysInMonth(d.getMonth(), d.getFullYear()) + 1) == 1) ? ((startDate + i) % daysInMonth(d.getMonth(), d.getFullYear()) + 1) : ((startDate + i) % daysInMonth(d.getMonth(), d.getFullYear()) + 1) + daysInMonth(d.getMonth(), d.getFullYear());
    }

};

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}