window.onload = function() {
	if(window.location.href.includes("dashboard.html")) {
		var values = {Cookie: getCookie("email")}; 
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://cssa-backend.herokuapp.com/indirectProfile", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(JSON.stringify(values));
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if(this.responseText == "false") {
					console.log("Error A1: Report bug at crewcssa@gmail.com");
				} else {
					let valueArray = JSON.parse(this.responseText).info;
					document.getElementById("updateA").value = valueArray[2];
					document.getElementById("updateB").value = valueArray[3];
					document.getElementById("updateC").value = valueArray[1];
					document.getElementById("updateD").value = valueArray[0];
					document.getElementById("updateE").value = valueArray[4];
				}
			} 
		}; 
	}
}
function create() {
	let emailC = document.getElementById("email_c").value;
	var usr = document.getElementById("username").value;
	var fName = document.getElementById("f_name").value;
	var lName = document.getElementById("l_name").value;
	var pwd = document.getElementById("pwd").value;
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://cssa-backend.herokuapp.com/checkUsername", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(usr); 
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == 1) {
				alert("Username taken");
			} else {
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "https://cssa-backend.herokuapp.com/checkEmail", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(emailC); 
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText == 1) {
							alert("This email is already in use");
						} else {
							var values = {Email: emailC, Username: usr, First: fName, Last: lName ,  Password:pwd};
							var xhttp = new XMLHttpRequest();
							xhttp.open("POST", "https://cssa-backend.herokuapp.com/registration", true);
							xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xhttp.send(JSON.stringify(values)); 
							xhttp.onreadystatechange = function() {
								if (this.readyState == 4 && this.status == 200) {
									if(this.responseText == "1") {
										setCookie('email',emailC,365);
										setCookie('User',usr,365);
										setCookie('fName',fName,365);
										setCookie('lName',lName,365);
										window.location.href = "dashboard.html";
									} 
								} 
							}; 
						}
					} 
				}; 
			}
		} 
	}; 		
}

function login() {
	var unknown = document.getElementById("s_username").value;
	var pwd = document.getElementById("s_pwd").value;
	var values = {Unknown: unknown,  Password:pwd};
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://cssa-backend.herokuapp.com/check", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(values));
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "false") {
				alert("Invalid Information");
			} else {
				let valueArray = JSON.parse(this.responseText).info;
				setCookie('email',valueArray[0],365);
				setCookie('User',valueArray[1],365);
				setCookie('fName',valueArray[2],365);
				setCookie('lName',valueArray[3],365);
				window.location.href = "dashboard.html";
			}
		} 
	}; 
}

function onLoad() {
	gapi.load('auth2', function() {
	  gapi.auth2.init();
	});
}

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://cssa-backend.herokuapp.com/checkEmail", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(profile.getEmail()); 
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == 1) {
				//Account already exists | set profile
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "https://cssa-backend.herokuapp.com/gleUsername", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(profile.getEmail()); 
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						let valueArray = JSON.parse(this.responseText).info;
						setCookie('email',valueArray[0],365);
						setCookie('User',valueArray[1],365);
						setCookie('fName',valueArray[2],365);
						setCookie('lName',valueArray[3],365);
						window.location.href = "dashboard.html";
					} 
				}; 
			} else 	{
				let username = profile.getGivenName() + "#" + (Math.floor(Math.random() * 9000) + 1000);
				let password = generatePassword();
				var values = {Email: profile.getEmail(), Username: username, First: profile.getGivenName(), Last: profile.getFamilyName() ,  Password:password};
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "https://cssa-backend.herokuapp.com/registrationA", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(JSON.stringify(values)); 
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText == "1") {
							setCookie('email',profile.getEmail(),365);
							setCookie('User',username,365);
							setCookie('fName',profile.getGivenName(),365);
							setCookie('lName',profile.getFamilyName(),365);
							window.location.href = "dashboard.html";
						} 
					} 
				}; 
			}
		} 
	}; 
}

function updateProfile() {
	let a = document.getElementById("updateA").value;
	let b = document.getElementById("updateB").value;
	let c = document.getElementById("updateC").value;
	let d = document.getElementById("updateD").value;
	let e = document.getElementById("updateE").value;
	var values = {Scopecode: d, Username:c, FirstName:a, LastName: b, Credentials: e, Init: getCookie("email")}; 
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://cssa-backend.herokuapp.com/updateProfile", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(values));
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "error") {
				console.log("Error A2: Report bug at crewcssa@gmail.com");
			} else {
				setCookie('email',d,365);
				setCookie('User',c,365);
				setCookie('fName',a,365);
				setCookie('lName',b,365);
				alert("Profile has been successfully updated!");
			}
		} 
	}; 
}

function interestForm() {
	let container = {
		Init: getCookie("email"),
		Competition: document.getElementById("competitionInput").value,
		Dates: {
			Date1: document.getElementById("date1").checked,
			Date2: document.getElementById("date2").checked,
			Date3: document.getElementById("date3").checked,
			Date4: document.getElementById("date4").checked
		},
		Events: {
			EventA: document.getElementById("event1").value,
			EventB: document.getElementById("event2").value,
			EventC: document.getElementById("event3").value,
			EventD: document.getElementById("event4").value
		}
	};

	let eventsArr = [];
	let nones = 0;

	events.forEach((v, k) => {
		if (eventsArr.includes(v)) {
			eventsArr = [];
			nones = 0;

			return alert("Please do not select the same event twice.")
		} else {
			eventsArr.push(v);
			
			if (v == "None") {
				nones++;
			}
		}
	});

	if (nones == 4) {
		return alert("Please select at least one event.");
	}

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://cssa-backend.herokuapp.com/userInterestData", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(container));
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "error") {
				console.log("Error A4: Report bug at crewcssa@gmail.com");
			} else {
				alert("Thank you for submitting the interest form!")
			}
		} 
	}; 
}

let events = new Map();

document.getElementById("event1").addEventListener("change", validateEvent("event1"));
document.getElementById("event2").addEventListener("change", validateEvent("event2"));
document.getElementById("event3").addEventListener("change", validateEvent("event3"));
document.getElementById("event4").addEventListener("change", validateEvent("event4"));

function validateEvent(eventNum) {
	if (events.has(document.getElementById(eventNum).value)) {
		alert("Please do not select the same event twice.");
	} else if (document.getElementById(eventNum).value == "None") {
		events.delete(eventNum);
		if (events.size == 0) {
			alert("Please select at least one event.");
		}
	} else {
		events.set(eventNum, document.getElementById(eventNum).value);
	}
}

function refer() {
	let a = document.getElementById("referA").value;
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://cssa-backend.herokuapp.com/checkUsername", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(a);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == 1) {
				var values = {Refer: a, Init: getCookie("email")}; 
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "https://cssa-backend.herokuapp.com/refer", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(JSON.stringify(values));
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText == "error") {
							console.log("Error A3: Report bug at crewcssa@gmail.com");
						} else {
							alert("Your referrer has an added token. Thank you!")
						}
					} 
				}; 
			} else {
				alert("This user does not exist. Therefore, you cannot refer him");
			}
		} 
	}; 
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

function signOut() {
	onLoad();
	eraseCookie('email');eraseCookie('User');eraseCookie('fName');eraseCookie('lName');
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log("You have signed out!");
	});
	window.location = "index.html";
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function sendContact() {
	let a = document.getElementById("contact_name").value;
	let b = document.getElementById("contact_email").value;
	let c = document.getElementById("contact_message").value;
	var co = {A: a, B:b, C:c};
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://cssa-backend.herokuapp.com/submitContact", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(co));
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "error") {
				console.log("Error B1");
			} else {
				alert("You shall be contacted in 1-2 days with a response!");
			}
		} 
	}; 
}