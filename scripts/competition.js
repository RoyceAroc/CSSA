window.addEventListener('load', function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            populateCompetitionPage(xhttp.responseText);
        }
    };

    xhttp.open("GET", "./xml/eventData.xml", true);
    xhttp.send();
});

// document.addEventListener('DOMContentLoaded', function() {
//     var competitionCalendar = document.getElementById('competition-calendar');

//     var calendar = new FullCalendar.Calendar(competitionCalendar, {
//         initialView: 'dayGridMonth',
//         height: 696,
//         aspectRatio: 0.5 * window.innerWidth/696,
//         events: [
//             {
//                 title: 'Test',
//                 start: '2021-03-01',
//                 end: '2021-03-25',
//                 allDay: true,
//             }
//         ]
//     });

//     calendar.render();

//     document.getElementById('competition-calendar').style.width = `696px`;
// });

function populateCompetitionPage(eventData) {
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(eventData, "text/xml");

    for (events of xmlDoc.getElementsByTagName("events")) {
        for (let i in events.childNodes) {
            if (i % 2 == 1) {
                let e = events.childNodes[i];
    
                let eventHTML = `
                    <div class="event">
                        <img class="event-image" style="" src="${e.childNodes[3].innerHTML}" alt="...">
        
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

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let d = new Date();
    let year = d.getFullYear();
    let month = months[d.getMonth()];
    let day = days[d.getDay()];

    let seed = 7 + d.getDay();

    let startDate = d.getDate() - d.getDay() - 8;

    for (let i = 0; i < 35; i++) {
        document.getElementById(i).innerHTML = (startDate + i) % 31 + 1;
    }

};

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}