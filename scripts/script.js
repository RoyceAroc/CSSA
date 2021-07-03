function setLabel(label, text) {
    $('#exampleModalLabel').text(label);
    $('#label0B').html(text);
    $('#setLabel').modal('show');
}

function setCookie(name, value, days) {
	var expires = "";

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}

	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');

	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}

	return null;
}

function eraseCookie(name) {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function generatePassword() {
	var length = 8,
		charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
		retVal = "";

	for (var i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}

	return retVal;
}

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

var setNavbarScroll = false;



window.addEventListener('load', function () {
    if(typeof InstallTrigger !== 'undefined') {
        let navFirefox = document.getElementsByClassName("nav-link");
        for(i=0; i<navFirefox.length; i++) {
          navFirefox[i].style.fontWeight = "normal";
        }
        let loginFirefox = document.getElementById("navbar-login");
        loginFirefox.style.fontWeight = "normal";
    }
    var height = window.pageYOffset;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // No scrollby navbar for now -> Maybe in the future for mobile and other devices
        document.getElementsByClassName("navbar")[0].style.backgroundColor = "black";
    } else{
        let control = document.getElementsByTagName("nav")[0];
            if (height  > 1) {
                document.getElementsByClassName("navbar")[0].style.backgroundColor = "black";
            } else {
                document.getElementsByClassName("navbar")[0].style.backgroundColor = "transparent";
            }
    }

    if (getCookie('email') != null) {
        document.getElementById("navbar-login").innerHTML = "Logout";
        document.getElementById("navbar-login").setAttribute("href", "javascript:signOut();");
    } else {
        document.getElementById("navbar-login").innerHTML = "Login";
        document.getElementById("navbar-login").setAttribute("href", "sign.html");
    }
  
    setNavbarScroll = true;
});


$(window).scroll(function() {
    var height = $(window).scrollTop();

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // No scrollby navbar for now -> Maybe in the future for mobile and other devices
        document.getElementsByClassName("navbar")[0].style.backgroundColor = "black";
    } else{
        let control = document.getElementsByTagName("nav")[0];
        if (setNavbarScroll) {
            if (height  > 1) {
                document.getElementsByClassName("navbar")[0].style.backgroundColor = "black";
            } else {
                document.getElementsByClassName("navbar")[0].style.backgroundColor = "transparent";
            }
        }
    }
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

fetch('scripts/seo_optimization.json').then(response => response.text()).then(structuredDataText => {
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
            "description": "Competitors will write algorithmic or heuristic code to solve multiple short tasks on the Hackerrank platform (<a style=\"color:white\" href=\"https://www.hackerrank.com/cssa\">hackerrank.com/cssa</a>). Coding languages such as C++, Java, Python, JavaScript, Scala, and Swift are allowed. <br><br> Event topics include the following <ul> <li>Complete Search</li><li>Sorting & Sets</li><li>Prefix Sums</li><li>Sorting & Searching</li><li>Graphs</li><li>Dynamic Programming</li><li>Trees</li><li>Miscellaneous Topics</li></ul>",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "competition/viewable/Programming Challenges/Programming Challenges Event Guide.pdf"
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
        },
        "SysAdmin": {
            "name": "SysAdmin",
            "image": "./images/SysAdmin Event Icon - Transparent.png",
            "type": "",
            "participants": "Individual",
            "shortDescription": "Answer questions related to various system admin topics, including computer hardware, security policies, database management, networking, file storage, and servers.",
            "description": "Answer questions related to various system admin topics, including computer hardware, security policies, database management, networking, file storage, and servers.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1vtHLAzQk0qy_GQqlHM-WVFuUeElktxPXn8uqQ0LBL48/edit?usp=sharing"
                }
            ]
        },
        "Networking": {
            "name": "Networking",
            "image": "./images/Networking Event Icon - Transparent.png",
            "type": "",
            "participants": "Individual",
            "shortDescription": "Answer questions related to various networking topics, including network topologies, network hardware, servers, communication, and network security.",
            "description": "Answer questions related to various networking topics, including network topologies, network hardware, servers, communication, and network security.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/1SdsqFaOuGSk9fbUEJ7CtMQM2_Gpatrnztdub7glZg7g/edit?usp=sharing"
                }
            ]
        },
        "Computer Science Math": {
            "name": "Computer Science Math",
            "image": "./images/Computer Science Math Icon - Transparent.png",
            "type": "",
            "participants": "Individual",
            "shortDescription": "Answer questions related to various computer science math topics, including algorithms, complexity, computability, formal languages, and logic.",
            "description": "Answer questions related to various computer science math topics, including algorithms, complexity, computability, formal languages, and logic.",
            "resources": [
                {
                    "title": "Event Guide",
                    "type": "Event Guide",
                    "link": "https://docs.google.com/document/d/12rd0LExwANKb4yoWp8eHnVYKtVQRtMF39EGXUQvd7QM/edit?usp=sharing"
                }
            ]
        }
	}
};



// Cookie Consent Check
function allowCookies() {
    $("#cookieContainer").hide();
    setCookie('allowCookie', true, 999999);
}

if(getCookie('allowCookie') == null) {
    
    let cookieContainer = document.createElement("div");
    cookieContainer.innerHTML = `
    <div id="cookieContainer" style="padding: 7px 10%; padding-top: 17px; padding-right: 20%;background-color: #232423;font-family: 'Quicksand'; border-top: 6px solid #0097A7; width: 100%; bottom:0; position: fixed; z-index: 10000000000000000000000000000000000000000000000000000000;"> 
        <p> This website uses cookies to ensure you get the best experience on your website. By continuing to visit this site you agree to our use of cookies. </p>
        <button class="cookies-btn" style="position: fixed; right:10%; bottom:1.4%; padding: 8px; border-radius: 10px; outline: none; background-color: transparent;color:#0097A7; border:2px solid #0097A7;" onclick="allowCookies();">GOT IT</button>
    </div>
    `;
    document.getElementsByTagName("html")[0].appendChild(cookieContainer);
}