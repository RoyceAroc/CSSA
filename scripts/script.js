window.addEventListener('load', function () {
    if (getCookie('email') != null) {
        if (window.location.href.includes("sign.html")) {
            window.location.href = "dashboard.html";
        } else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementsByTagName("nav")[0].innerHTML = xhttp.responseText;
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
                } else if (this.readyState == 4 && this.status != 200) {
                    xhttp.send();
                }
            };

            xhttp.open("GET", "navbarB.html", true);
            xhttp.send();
        }
    }
   
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
            "description": "Given tasks, write pseudocode algorithms that solve the tasks most efficiently. Scoring is based on the time complexity (Big O) of the solutions.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": ""
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
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": ""
                }
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
                    "link": ""
                }
            ]
        },
        "Capture the Flag": {
            "name": "Capture the Flag",
            "image": "./images/Capture the Flag Event Icon - Transparent.png",
            "type": "Submission",
            "participants": "Individual",
            "shortDescription": "Users must hide a secret (a string of text) somewhere on a website. All websites are hosted by the organization and given to other competitors, who must find the secrets.",
            "description": "Users must hide a secret (a string of text) somewhere on a website. All websites are hosted by the organization and given to other competitors, who must find the secrets.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": ""
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
                    "link": ""
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
                    "link": ""
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
                    "link": ""
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
                    "link": ""
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
                    "link": ""
                }
            ]
        }
	}
};