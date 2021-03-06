window.addEventListener('load', function () {
    populateCompetitionPage();
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

        let eventHTML = `
            <div class="event" onclick="window.location='event.html?event=${e["name"]}'">
                <img class="event-image" style="" src="${e["image"]}" alt="...">

                <div class="event-text">
                    <h4 class="event-title">${e["name"]}</h4>
                    <p class="event-description">${e["shortDescription"]}</p>
                </div>
            </div>
        `;

        document.getElementById("events-collapsible").innerHTML += eventHTML;
    }

    for (k of Object.keys(calendarItems["items"])) {
        let i = calendarItems["items"][k];

        let listItemHTML = `
            <div class="calendar-list-item">
                <div class="calendar-list-item-text">
                    <h5 class="calendar-list-item-title">
                        ${i["name"]} (${(i["start"] == i["end"]) ? i["start"] : i["start"] + "-" + i["end"]})
                    </h5>
                    <p class="calendar-list-item-description">
                        ${i["description"]}
                    </p>
                </div>
            </div>
        `;

        document.getElementById("calendar-list").innerHTML += listItemHTML;
    }

    calendar();
};

function calendar(startingDate = d) {
    for (let i = 0; i < 35; i++) {
        var currentDate = new Date(startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate() + i - startingDate.getDay() - 7);

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

const calendarItems = {
    "items": {
        "item1": {
            "name": "Registration Period",
            "description": "Registration for the 2021 Summer Competition is open until the end of June",
            "start": "6/1",
            "end": "6/30",
        },
        "item2": {
            "name": "Summer Competition 2021",
            "description": "CSSA's first full competition! Participants are allowed to compete at any time of the month.",
            "start": "7/1",
            "end": "7/31",
        }
    }
};