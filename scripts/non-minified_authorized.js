window.addEventListener("load", function() {
	if(window.location.href.includes("dashboard.html")) {
		var valuesA = {user: getCookie("User")}; 
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://cssa-backend.herokuapp.com/getClientData", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(JSON.stringify(valuesA));
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if(this.responseText == "false") {
					console.log("Error C1: Report bug at crewcssa@gmail.com");
				} else {
					let play = JSON.parse(this.responseText).info;
					if(play[5] != "-") {
						document.getElementById("competition-registration").style.display = "none";
						document.getElementById("signed-up").innerHTML = "You have signed up for the <b>" + JSON.parse(play[5]).Competition+ " </b>. The events in which you are in competing are " + JSON.parse(play[5]).Events.EventA + ", " + JSON.parse(play[5]).Events.EventB + ", " +  JSON.parse(play[5]).Events.EventC + ", " + JSON.parse(play[5]).Events.EventD + ".";
					} 
					if(play[6] != "-") {
						document.getElementById("userinfo").style.borderStyle = "none";
						document.getElementById("referral").style.display = "none";
						
					} 
				}
			} 
		};
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://cssa-backend.herokuapp.com/indirectProfile", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		var values = {Cookie: getCookie("email")}; 
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

		document.getElementById("event1").addEventListener("change", function () {
			validateEvent("event1");
		});
	
		document.getElementById("event2").addEventListener("change", function () {
			validateEvent("event2");
		});
	
		document.getElementById("event3").addEventListener("change", function () {
			validateEvent("event3");
		});
	
		document.getElementById("event4").addEventListener("change", function () {
			validateEvent("event4");
		});
	}
});

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
				
										firebaseAuth(emailC, usr, pwd);
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
				setCookie('lName', valueArray[3], 365);
				
				firebaseAuth(valueArray[0], valueArray[1], pwd);
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
						setCookie('lName', valueArray[3], 365);

						console.log(valueArray[0], valueArray[1], valueArray[4]);
				
						firebaseAuth(valueArray[0], valueArray[1], valueArray[4]);
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
							setCookie('lName', profile.getFamilyName(), 365);
				
							firebaseAuth(profile.getEmail(), username, password);
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
	if(a == "" || a.length > 50) {
		alert("Invalid First Name");
	} else if(b == "" || b.length > 50) {
		alert("Invalid Last Name");
	} else if(c == "" || c.length > 50) {
		alert("Invalid Username Format");
	} else if(d = "" || d.length > 70) {
		alert("Invalid Email Format");
	} else if(e == "" || e.length > 50) {
		alert("Invalid Password Format");
	} else {
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
				
					firebaseAuth(d, c, e);
	
					alert("Profile has been updated successfully!");
				}
			}
		}; 
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
							alert("Your referrer has an added token. Thank you!");
							location.reload();
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

function firebaseAuth(email, username, password) {
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
		firebase.auth().onAuthStateChanged(function (user) {
			users.doc(user.uid).set({
				
			}, { merge: true }).then(() => {
				console.log("Hi! " + user.uid);

				window.location.href = "dashboard.html";
			}).catch((e) => {
				console.log(e.message);
				alert("Something went wrong :/ Please refresh the page and try again!");
			});
		});
    }).catch(function (error) {
        var errorCode = error.code;
		
		if (error.message == "The email address is already in use by another account.") {
			console.log("1");
			firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
				console.log("2");
				firebase.auth().onAuthStateChanged(function (user) {
					console.log("3");
					users.doc(user.uid).set({

					}, { merge: true }).then(() => {
						console.log("Hello! " + user.uid);
				
						window.location.href = "dashboard.html";
					}).catch((e) => {
						console.log(e.message);
						alert("Something went wrong :/ Please refresh the page and try again!");
					});
				});
			});
		}
	});
}