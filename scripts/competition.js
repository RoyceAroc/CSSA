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
    for (listEvent of Object.keys(calendarEvents["events"])) {
        let listItemHTML = `
            <div class="competition-item">
                <div class="competition-item-text">
                    <h5 class="competition-item-title">
                        ${listEvent["name"]} (${(listEvent["start"] == listEvent["end"]) ? listEvent["start"] + "-" + listEvent["end"] : listEvent["start"]})
                    </h5>
                    <p class="competition-item-description">
                        ${listEvent["description"]}
                    </p>
                </div>
            </div>
        `;
    }

    for (k of Object.keys(eventData["events"])) {
        let e = eventData["events"][k];

        let eventHTML = `
            <div class="event" onclick="window.location='event.html?event=${e["name"]}'">
                <img class="event-image" style="" src="${e["image"]}" alt="...">

                <div class="event-text">
                    <h4 class="event-title">${e["name"]}</h4>
                    <p class="event-description">${e["shortDescription"]}</p>
                </div>
            </div>
        `;

        document.getElementById("eventsCollapsible").innerHTML += eventHTML;
    }

    calendar(d);
};

function calendar(startingDate) {

    for (let i = 0; i < 35; i++) {
        var currentDate = new Date(startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate() + i - startingDate.getDay() - 7)

        document.getElementById(i).innerHTML = currentDate.getDate();
        
        if (currentDate.getMonth() == startingDate.getMonth()) {
            document.getElementById(i).style.backgroundColor = "#12121288"
        } else {
            document.getElementById(i).style.backgroundColor = "#00000000"
        }
    }

    document.getElementById("calendar-date").innerHTML = `${months[startingDate.getMonth()]} ${startingDate.getFullYear()}`;
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

const calendarEvents = {
    "events": {
        "event0": {
            "name": "First Mini-Competition Registration Opens",
            "description": "Register in the user dashboard for our first mini-competition!",
            "start": "2/10",
            "end": "2/10",
        },
        "event1": {
            "name": "First Mini-Competition",
            "description": "CSSA's first mini-competition! Participants are allowed to compete at any time of the month.",
            "start": "3/8",
            "end": "3/31",
        },
        "event2": {
            "name": "First Mini-Competition Awards",
            "description": "Awards will be streamed live (platform TBA) for everyone to watch.",
            "start": "4/13",
            "end": "4/13",
        }
    }
};