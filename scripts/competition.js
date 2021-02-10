window.addEventListener('load', function () {
    populateCompetitionPage()
});


var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let d = new Date();
let year = d.getFullYear();
let month = months[d.getMonth()];
let day = days[d.getDay()];

var currentMonth = d.getMonth();

function populateCompetitionPage() {
    for (k of Object.keys(eventData["events"])) {
        let e = eventData["events"][k];
        console.log(k)

        let eventHTML = `
            <div class="event" onclick="window.location='event.html?event=${e["name"]}'">
                <img class="event-image" style="" src="${e["image"]}" alt="...">

                <div id="event-text">
                    <h4 id="event-title">${e["name"]}</h4>
                    <p id="event-description">${e["shortDescription"]}</p>
                </div>
            </div>
        `;

        document.getElementById("eventsCollapsible").innerHTML += eventHTML;
    }

    calendar(d);
};

function calendar(startingDate) {
    for (let i = 0; i < 35; i++) {
        document.getElementById(i).innerHTML = new Date(startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate() + i - startingDate.getDay()).getDate();
    }
}

function next() {
    currentMonth++;
    calendar(new Date(2021, currentMonth, (new Date(2021, currentMonth)).getDay()));
}

function previous() {
    currentMonth--;
    calendar(new Date(2021, currentMonth, (new Date(2021, currentMonth)).getDay()));
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}
