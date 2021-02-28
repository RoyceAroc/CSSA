firebase.initializeApp({
    apiKey: "AIzaSyAPTvz8weUBIMyjl6ekC1uegX-j4u2Z1sc",
    authDomain: "cssa-dev.firebaseapp.com",
    databaseURL: "https://cssa-dev-default-rtdb.firebaseio.com",
    projectId: "cssa-dev",
    storageBucket: "cssa-dev.appspot.com",
    messagingSenderId: "921024173703",
    appId: "1:921024173703:web:46f4a35d815964ddf44a22",
    measurementId: "G-WBN11JNGTN"
});
firebase.analytics();

var db = firebase.firestore();
db.enablePersistence();

var users = db.collection("users");

function setActive() {
    switch (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1)) {
        case "about.html":
          document.getElementsByClassName("nav-link")[1].classList.add("active");
          break;
        case "":
            document.getElementsByClassName("nav-link")[0].classList.add("active");
            break;
        case "competition.html":
            document.getElementsByClassName("nav-link")[2].classList.add("active");
            break;
        case "dashboard.html":
            document.getElementsByClassName("nav-link")[3].classList.add("active");
            break;
      }
}

window.addEventListener('load', function () {
    if (getCookie('email') != null) {
        if (window.location.href.includes("sign.html")) {
            window.location.href = "dashboard.html";
        } else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementsByTagName("nav")[0].innerHTML = xhttp.responseText;
                    setActive();
                } else if (this.readyState == 4 && this.status != 200) {
                    xhttp.send();
                }
            };
    
            xhttp.open("GET", "navbarA.html", true);
            xhttp.send();
        }
    } else {
        if (window.location.href.includes("dashboard.html")) {
            window.location.href = "sign.html";
        } else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementsByTagName("nav")[0].innerHTML = xhttp.responseText;
                    setActive();
                } else if (this.readyState == 4 && this.status != 200) {
                    xhttp.send();
                }
            };

            xhttp.open("GET", "navbarB.html", true);
            xhttp.send();
        }
    }
    
    //alert(filename);
    var footerxhttp = new XMLHttpRequest();
    footerxhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("footer").outerHTML = footerxhttp.responseText;
        } else if (this.readyState == 4 && this.status != 200) {
            footerxhttp.send();
        }
    };

    footerxhttp.open("GET", "footer.html", true);
    footerxhttp.send();
});

function display(elem) {
    $('#' + elem).toggle();
}

$('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(400);
});

$('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(400);
});

fetch('scripts/seo_optimization.json')
.then(response => response.text())
.then(structuredDataText => {
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = structuredDataText;
  document.head.appendChild(script);
});

const eventData = {
	"events": {
		"Algorithmic Thinking": {
            "name": "Algorithmic Thinking",
            "image": "./images/Algorithmic Thinking Event Icon - Transparent.png",
            "type": "Tasks",
            "participants": "Individual",
            "shortDescription": "Given tasks, write pseudocode algorithms that solve the tasks most efficiently. Scoring is based on the time complexity (Big O) of the solutions.",
            "description": "Competitors are tested on their general knowledge of algorithms and ability to develop and write algorithms in <b>pseudocode</b> that solves tasks efficiently. Coding languages can be used but will not result in the addition of extra points. Pseudocodes can be written in plain english as long as the graders understand the <i>gist</i> of what you are trying to say. <br><br> Event topics include the following <ul> <li>Time & Space Complexity Notations</li><li>Complexity Classes</li><li>Algorithm Reductions</li><li>Search Algorithms</li><li>Sorting Algorithms</li><li>Pathfindings Algorithms</li></ul>",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "competition/viewable/Algorithmic Thinking/Algorithmic Thinking Event Guide.pdf"
                },
                {
                    "title": "Algorithmic Thinking Overview",
                    "type": "Lecture Slides",
                    "link": "competition/viewable/Algorithmic Thinking/Algorithmic Thinking Overview.pdf"
                },
                {
                    "title": "Algorithmic Thinking Sample Questions",
                    "type": "Lecture Slides",
                    "link": "competition/viewable/Algorithmic Thinking/Algorithmic Thinking Sample Questions.pdf"
                },
                {
                    "title": "Algorithmic Thinking Lecture Video #1",
                    "type": "Videos",
                    "link": "g9oWz2YzCFM"
                }
            ]
        },
        "Programming Challenges": {
            "name": "Programming Challenges",
            "image": "./images/Programming Challenges Event Icon - Transparent.png",
            "type": "Tasks",
            "participants": "Team of 2",
            "shortDescription": "Write algorithmic or heuristic code to solve multiple short tasks made around a common theme. C++, Java, Python, and Javascript are allowed.",
            "description": "Write algorithmic or heuristic code to solve multiple short tasks made around a common theme. C++, Java, Python, and Javascript are allowed.",
            "resources": [
                // {
                //     "title": "Event Guide",
                //     "type": "Event Guide",
                //     "link": ""
                // }
            ]
        },
        "Data Science": {
            "name": "Data Science",
            "image": "./images/Data Science Event Icon - Transparent.png",
            "type": "Testing",
            "participants": "Team of 2",
            "shortDescription": "Answer questions related to various data science topics, including statistics, neural networks, clustering, and various other topics.",
            "description": "Answer questions related to various data science topics, including statistics, neural networks, clustering, and various other topics.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/16RVmqzY_jXd0fGYFA5OaCGvDI1Qso8Oq6v3Jk6qukkM/edit?usp=sharing"
                }
            ]
        },
        "Capture the Flag": {
            "name": "Capture the Flag",
            "image": "./images/Capture the Flag Event Icon - Transparent.png",
            "type": "Submission",
            "participants": "Individual",
            "shortDescription": "Users must hide a secret somewhere on a website. All websites are hosted by the organization and given to other competitors, who must find the secrets.",
            "description": "Users must hide a secret somewhere on a website. All websites are hosted by the organization and given to other competitors, who must find the secrets.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1lDMPh44g8r0almOwrmJRCXWK_VvoPnnUKKiifRiHkZo/edit?usp=sharing"
                }
            ]
        },
        "Website Design": {
            "name": "Website Design",
            "image": "./images/Website Design Event Icon - Transparent.png",
            "type": "Case Study",
            "participants": "Team of 3",
            "shortDescription": "Design a website around a prompt that will be provided by the judges at each competition. Websites are judged based on aesthetics and functionality.",
            "description": "Design a website around a prompt that will be provided by the judges at each competition. Websites are judged based on aesthetics and functionality.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1fcBO3Ho2iekoCz3_5ZYVnNeiiejnoU2lMntv8uuYm4s/edit?usp=sharing"
                }
            ]
        },
        "Cybersecurity": {
            "name": "Cybersecurity",
            "image": "./images/Cybersecurity Event Icon - Transparent.png",
            "type": "Testing",
            "participants": "Individual",
            "shortDescription": "Answer questions related to various cybersecurity topics, including cryptography, privacy, internet security, and various other topics.",
            "description": "Answer questions related to various cybersecurity topics, including cryptography, privacy, internet security, and various other topics.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1qxK9D447ZWz6Zm49peVXriFaL-gRceWiUvkuBnnk1pw/edit?usp=sharing"
                }
            ]
        },
        "Bug Smasher": {
            "name": "Bug Smasher",
            "image": "./images/Bug Smasher Event Icon - Transparent.png",
            "type": "Case Study",
            "participants": "Individual",
            "shortDescription": "Given a long piece of code, find all bugs and fix them without running the code. Code is provided in C++, Java, Python, and JavaScript.",
            "description": "Given a long piece of code, find all bugs and fix them without running the code. Code is provided in C++, Java, Python, and JavaScript.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1992P86eFAk3us7USDK7uZY3-QxN1FbdB6L66FkTF5Hk/edit?usp=sharing"
                }
            ]
        },
        "Tech Support": {
            "name": "Tech Support",
            "image": "./images/Tech Support Event Icon - Transparent.png",
            "type": "",
            "participants": "Team of 2",
            "shortDescription": "Talk to judges who present a case study involving a technology issue that must be fixed by providing instructions for the judges to follow.",
            "description": "Talk to judges who present a case study involving a technology issue that must be fixed by providing instructions for the judges to follow.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1d7GkwdmlpFwouJlx-slEHNR4zliDdcrNABeXpvJDLIo/edit?usp=sharing"
                }
            ]
        },
        "Information Theory": {
            "name": "Information Theory",
            "image": "./images/Information Technology Event Icon - Transparent.png",
            "type": "",
            "participants": "Individual",
            "shortDescription": "Answer questions related to various information theory topics, including entropy, information compression, error correction, and various other topics.",
            "description": "Answer questions related to various information theory topics, including entropy, information compression, error correction, and various other topics.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1uUynSP-fDfyv-TDxPzp3hsAJ6dJaRX9tCorCdx-SwIo/edit?usp=sharing"
                },
                {
                    "title": "Study Guide",
                    "type": "Study Guide",
                    "link": "https://docs.google.com/document/d/1SH5KPmxstwGoKtnPYb0RGt2dG-DMyek3wPM2mRyZ1tk/edit?usp=sharing"
                }
            ]
        },
        "Web Scraping": {
            "name": "Web Scraping",
            "image": "./images/Web Scraping Event Icon - Transparent.png",
            "type": "",
            "participants": "Individual",
            "shortDescription": "Write code that can extract information from a website without seeing it yourself, just by using clues, hints, and the website theme.",
            "description": "Write code that can extract information from a website without seeing it yourself, just by using clues, hints, and the website theme.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1zwqEOWGel_SOtYWRHXtmi2xT7aRjjTRAHcIv50CDyl8/edit?usp=sharing"
                }
            ]
        },
        "Golf": {
            "name": "Golf",
            "image": "./images/Golf Event Icon - Transparent.png",
            "type": "",
            "participants": "Individual",
            "shortDescription": "Given a short task, write the densest code possible that can solve the task but takes up the least number of characters.",
            "description": "Given a short task, write the densest code possible that can solve the task but takes up the least number of characters.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1g8VhU3HtQRkgkHrEkWYfB2iPAxM3Ct04dpDKT9BnT9I/edit?usp=sharing"
                }
            ]
        }
	}
};