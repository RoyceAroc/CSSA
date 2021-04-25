var globalSynchronizedPassword = "";

var events = "";

function setCookie(name, value, days) {
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

    for (var i = 0;i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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

window.addEventListener("load", () => {
	if (window.location.href.includes("dashboard.html")) {
		// $('#first-mini-comp').modal('show');
		var completed = true;
		
		setTimeout(function() {
			if(completed) {
				document.getElementById('preloader').style.display = "block";
			}
		}, 2000);

		if (getCookie("googleToken") != null && getCookie("googleToken") != "") {
			var valuesA = {
				user: getCookie("User"),
				hashCred: getCookie("googleToken")
			};
		} else {
			var valuesA = {
				user: getCookie("User"),
				hashCred: getCookie("hashedAuthCred")
			};
		}

		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if (this.responseText == "false") {
					console.log(this.responseText);
				} else {
					let e = JSON.parse(this.responseText).info;

					if (e[5] != "-") {
						document.getElementById("referral").style.display = "none";
						document.getElementById("userinfo").style.borderStyle = "none";
					}

					let valueArray = JSON.parse(this.responseText).info;

					document.getElementById("updateA").value = valueArray[2];
					document.getElementById("updateB").value = valueArray[3];
					document.getElementById("updateC").value = valueArray[1];
					document.getElementById("updateD").value = valueArray[0];
					events = valueArray[6];

					firebaseAuth(valueArray[0], valueArray[1], e[4]);

					document.getElementById("preloader").style.display = "none";
					document.getElementById("profile").style.display = "block";
					completed = false;
				}
			}
		};

		xhttp.open("POST", "https://cssa-backend.herokuapp.com/getClientData", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(JSON.stringify(valuesA));
	}
});

function create() {
	let emailC = document.getElementById("email_c").value;
	var usr = document.getElementById("username").value;
	var fName = document.getElementById("f_name").value;
	var lName = document.getElementById("l_name").value;
	var pwd = document.getElementById("pwd").value;

	var values = {
		Email: emailC,
		Username: usr,
		First: fName,
		Last: lName,
		Password: pwd,
		Google: "-"
	};
	
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText.includes("argon")) {
				setCookie('email', emailC, 365);
				setCookie('User', usr, 365);
				setCookie('fName', fName, 365);
				setCookie('lName', lName, 365);
				setCookie('hashedAuthCred', this.responseText, 365);
				
				firebaseAuth(emailC, usr, this.responseText);

				window.location = "dashboard.html";
			} else {
				alert(this.responseText);
			}
		}
	};

	xhttp.open("POST", "https://cssa-backend.herokuapp.com/registration", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(values));
}

function login() {
	var unknown = document.getElementById("s_username").value;
	var pwd = document.getElementById("s_pwd").value;

	var values = {
		Unknown: unknown,
		Password: pwd
	};

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText == "Invalid Credentials" || this.responseText == "Account with that Username/Email Does Not Exist. Please create an account instead.") {
				alert(this.responseText);
			} else {
			    let valueArray = JSON.parse(this.responseText).info;

				setCookie('email',valueArray[0],365);
				setCookie('User',valueArray[1],365);
				setCookie('fName',valueArray[2],365);
				setCookie('lName', valueArray[3], 365);
				setCookie('hashedAuthCred', valueArray[4], 365);
				
				firebaseAuth(valueArray[0], valueArray[1], valueArray[4]);

				window.location = "dashboard.html";
			}
		}
	};

	xhttp.open("POST", "https://cssa-backend.herokuapp.com/check", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(values));
}

function onLoad() {
	gapi.load('auth2', function() {
	  gapi.auth2.init();
	});
}

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText == "1") {
				var xhttp = new XMLHttpRequest();

				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						let valueArray = JSON.parse(this.responseText).info;

						setCookie('email', valueArray[0], 365);
						setCookie('User', valueArray[1], 365);
						setCookie('fName', valueArray[2], 365);
						setCookie('lName', valueArray[3], 365);
						setCookie('hashedAuthCred', valueArray[4], 365);
						setCookie('googleToken', profile.getId(), 365);
						
						firebaseAuth(valueArray[0], valueArray[1], valueArray[4]);

						window.location = "dashboard.html";

					}
				};

				xhttp.open("POST", "https://cssa-backend.herokuapp.com/check", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

				var values = {
					Unknown: profile.getEmail(),
					Password: profile.getId()
				};

				xhttp.send(JSON.stringify(values));
			} else 	{
				let username = profile.getGivenName() + "#" + (Math.floor(Math.random() * 9000) + 1000);
				let password = generatePassword();

				if (profile.getFamilyName()) {
					var values = {
						Email: profile.getEmail(),
						Username: username,
						First: profile.getGivenName(),
						Last: profile.getFamilyName(),
						Password: password,
						Google: profile.getId()
					};
				} else {
					var values = {
						Email: profile.getEmail(),
						Username: username,
						First: profile.getGivenName(),
						Last: "-", Password:password,
						Google: profile.getId()
					};
				}
				
				var xhttp = new XMLHttpRequest();

				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if (this.responseText.includes("argon")) {
							setCookie('email', profile.getEmail(), 365);
							setCookie('User', username, 365);
							setCookie('fName', profile.getGivenName(), 365);
							setCookie('lName', profile.getFamilyName(), 365);
							setCookie('hashedAuthCred',this.responseText, 365);
							setCookie('googleToken', profile.getId(), 365);
							
							firebaseAuth(profile.getEmail(), username, this.responseText);

							window.location = "dashboard.html";
						} else {
							alert(this.responseText);
						}
					} 
				};

				xhttp.open("POST", "https://cssa-backend.herokuapp.com/registration", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(JSON.stringify(values));
			}
		}
	};

	xhttp.open("POST", "https://cssa-backend.herokuapp.com/checkEmail", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(profile.getEmail());
}

function updateProfile() {
	let a = document.getElementById("updateA").value;
	let b = document.getElementById("updateB").value;
	let c = document.getElementById("updateC").value;
	let d = document.getElementById("updateD").value;

	if (a == "" || a.length > 50) {
		alert("Invalid First Name");
	} else if (b == "" || b.length > 50) {
		alert("Invalid Last Name");
	} else if (c == "" || c.length > 50) {
		alert("Invalid Username Format");
	} else if (d == "" || d.length > 70) {
		alert("Invalid Email Format");
	} else {
		let indexA = 0; let indexB = 0;

		if (getCookie('email') == d) {
			indexA = 1;
		}

		if (getCookie('User') == c) {
			indexB = 1;
		}

		if (getCookie("googleToken") != null && getCookie("googleToken") != "") {
			var values = {
				Scopecode: d,
				Username: c,
				FirstName: a,
				LastName: b,
				Init: getCookie("email"),
				hashCred: getCookie("googleToken"),
				indexA: indexA,
				indexB: indexB };
		} else {
			var values = {
				Scopecode: d,
				Username:c,
				FirstName:a,
				LastName: b,
				Init: getCookie("email"),
				hashCred: getCookie("hashedAuthCred"),
				indexA: indexA,
				indexB: indexB
			};
		}

		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if((this.responseText == "Email taken. Please choose another email" || this.responseText == "Username taken. Please choose another username") || this.responseText == "error") {
					alert(this.responseText);
				} else {
					setCookie('email', d, 365);
					setCookie('User', c, 365);
					setCookie('fName', a, 365);
					setCookie('lName', b, 365);
						
					firebaseAuth(d, c, globalSynchronizedPassword);
	
					alert("Profile has been updated successfully!");
				}
			}
		}; 

		xhttp.open("POST", "https://cssa-backend.herokuapp.com/updateProfile", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(JSON.stringify(values));
	}
}

function refer() {
	let a = document.getElementById("referA").value;

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText == "1") {
				if (getCookie("googleToken") != null && getCookie("googleToken") != "") {
					var values = {
						Refer: a,
						Init: getCookie("email"),
						hashCred: getCookie("googleToken")
					}; 
				} else {
					var values = {
						Refer: a,
						Init: getCookie("email"),
						hashCred: getCookie("hashedAuthCred")
					}; 
				}
				var xhttp = new XMLHttpRequest();

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

				xhttp.open("POST", "https://cssa-backend.herokuapp.com/refer", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(JSON.stringify(values));
			} else {
				alert("This user does not exist. Therefore, you cannot refer him");
			}
		} 
	}; 

	xhttp.open("POST", "https://cssa-backend.herokuapp.com/checkUsername", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(a);
}

function signOut() {
	onLoad();

	eraseCookie('email');
	eraseCookie('User');
	eraseCookie('fName');
	eraseCookie('lName');
	eraseCookie('googleToken');
	eraseCookie('hashedAuthCred');

	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log("You have signed out!");
	});

	window.location = "index.html";
}

function sendContact() {
	let a = document.getElementById("contact_name").value;
	let b = document.getElementById("contact_email").value;
	let c = document.getElementById("contact_message").value;

	var co = {
		A: a,
		B: b,
		C: c
	};

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "error") {
				console.log("Error B1");
			} else {
				alert("You shall be contacted in 1-2 days with a response!");
			}
		} 
	}; 
	
	xhttp.open("POST", "https://cssa-backend.herokuapp.com/submitContact", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(co));
}

function firebaseAuth(email, username, password) {
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
		firebase.auth().onAuthStateChanged(function (user) {
			users.doc(user.uid).set({}, { merge: true }).then(() => {
				console.log(user.uid);

				uid = user.uid;

				if (!window.location.href.includes("dashboard")) {
					window.location.href = "dashboard.html";
				}
			}).catch((e) => {
				console.log(e.message);

				alert("Something went wrong :/ Please refresh the page and try again!");
			});
		});
    }).catch(function (error) {
		if (error.message == "The email address is already in use by another account.") {
			firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
				firebase.auth().onAuthStateChanged(function (user) {
					users.doc(user.uid).set({}, { merge: true }).then(() => {
						console.log(user.uid);

						uid = user.uid;

						if (!window.location.href.includes("dashboard")) {
							window.location.href = "dashboard.html";
						}
					}).catch((e) => {
						console.log(e.message);

						alert("Something went wrong :/ Please refresh the page and try again!");
					});
				});
			});
		}
	});
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}