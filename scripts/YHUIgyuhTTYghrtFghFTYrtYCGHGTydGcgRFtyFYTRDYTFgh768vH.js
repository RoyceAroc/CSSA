var globalSynchronizedPassword = "";

var events = "";

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

window.addEventListener("load", () => {
	if (window.location.href.includes("dashboard.html")) {
		// $('#first-mini-comp').modal('show');
		var completed = true;

		setTimeout(function () {
			if (completed) {
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

		xhttp.onreadystatechange = function () {
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
					document.getElementById("competitions").style.display = "block";
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

	xhttp.onreadystatechange = function () {
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
				setLabel('Error', this.responseText);
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

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText == "Invalid Credentials" || this.responseText == "Account with that Username/Email Does Not Exist. Please create an account instead.") {
				setLabel('Error', this.responseText);
			} else {
				let valueArray = JSON.parse(this.responseText).info;

				setCookie('email', valueArray[0], 365);
				setCookie('User', valueArray[1], 365);
				setCookie('fName', valueArray[2], 365);
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
	gapi.load('auth2', function () {
		gapi.auth2.init();
	});
}

var googleUser = {};

gapi.load('auth2', function () {
	auth2 = gapi.auth2.init({
		client_id: '834594227639-dntdsbdaej8rsfhspugmaft12lcorhc8.apps.googleusercontent.com',
		cookiepolicy: 'single_host_origin',
	});

	attachSignin(document.getElementById('google-row'));
	attachSignin(document.getElementById('google-row-a'));
});

function attachSignin(element) {
	auth2.attachClickHandler(element, {},
		function (googleUser) {

			var profile = googleUser.getBasicProfile();

			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					if (this.responseText == "1") {
						var xhttp = new XMLHttpRequest();

						xhttp.onreadystatechange = function () {
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
					} else {
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
								Last: "-", Password: password,
								Google: profile.getId()
							};
						}

						var xhttp = new XMLHttpRequest();

						xhttp.onreadystatechange = function () {
							if (this.readyState == 4 && this.status == 200) {
								if (this.responseText.includes("argon")) {
									setCookie('email', profile.getEmail(), 365);
									setCookie('User', username, 365);
									setCookie('fName', profile.getGivenName(), 365);
									setCookie('lName', profile.getFamilyName(), 365);
									setCookie('hashedAuthCred', this.responseText, 365);
									setCookie('googleToken', profile.getId(), 365);

									firebaseAuth(profile.getEmail(), username, this.responseText);

									window.location = "dashboard.html";
								} else {
									setLabel('Error', this.responseText);
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
	)
}


function updateProfile() {
	let a = document.getElementById("updateA").value;
	let b = document.getElementById("updateB").value;
	let c = document.getElementById("updateC").value;
	let d = document.getElementById("updateD").value;

	if (a == "" || a.length > 50) {
		setLabel('Error', 'Invalid First Name');
	} else if (b == "" || b.length > 50) {
		setLabel('Error', 'Invalid Last Name');
	} else if (c == "" || c.length > 50) {
		setLabel('Error', 'Invalid Username Format');
	} else if (d == "" || d.length > 70) {
		setLabel('Error', 'Invalid Email Format');
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
				indexB: indexB
			};
		} else {
			var values = {
				Scopecode: d,
				Username: c,
				FirstName: a,
				LastName: b,
				Init: getCookie("email"),
				hashCred: getCookie("hashedAuthCred"),
				indexA: indexA,
				indexB: indexB
			};
		}

		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				if ((this.responseText == "Email taken. Please choose another email" || this.responseText == "Username taken. Please choose another username") || this.responseText == "error") {
					setLabel('Error', this.responseText);
				} else {
					setCookie('email', d, 365);
					setCookie('User', c, 365);
					setCookie('fName', a, 365);
					setCookie('lName', b, 365);

					firebaseAuth(d, c, globalSynchronizedPassword);
					setLabel('Successful', 'Your profile has been updated!');
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

	xhttp.onreadystatechange = function () {
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

				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						if (this.responseText == "error") {
							setLabel('Error', 'We are having trouble processing your request. Please try again later. If the problem persists, contact us at crewcssa@gmail.com.');
						} else {
							location.reload();
						}
					}
				};

				xhttp.open("POST", "https://cssa-backend.herokuapp.com/refer", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(JSON.stringify(values));
			} else {
				setLabel('Error', 'The user you are trying to refer does not exist within our system. Please try again later. With more than five referrals, you will get the Referral VIP role on our community discord server.');
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

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText == "error") {
				console.log("Error B1");
			} else {
				setLabel('Successful', 'You shall be contacted within 1-2 days with a response. Thanks for your patience!');
			}
		}
	};

	xhttp.open("POST", "https://cssa-backend.herokuapp.com/submitContact", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(co));
}

function updatePassword(email, password, oobCode) {

	var co = {
		email: email,
		password: password,
		oobCode: oobCode
	};

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText == "1") {
				setLabel('Successful', 'Your password has been changed. Please go back and try logging in.');
			} else {
				setLabel('Error', this.responseText.toString());
			}
		}
	};

	xhttp.open("POST", "https://backend.cssa.dev/changePassword", true);
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
				users.doc(uid).get().then((doc) => {
					event1 = doc.data().event1 ?? "None";
					event2 = doc.data().event2 ?? "None";
					event3 = doc.data().event3 ?? "None";
					event4 = doc.data().event4 ?? "None";
				});
			}).catch((e) => {
				console.log(e.message);
				setLabel('Error', 'Something went wrong :/ Please refresh the page and try again!');
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

						users.doc(uid).get().then((doc) => {
							event1 = doc.data().event1 ?? "None";
							if (event1.includes("!")) {
								document.getElementById("event1").value = "None";
							} else {
								document.getElementById("event1").value = event1;
							}

							event2 = doc.data().event2 ?? "None";
							if (event2.includes("!")) {
								document.getElementById("event2").value = "None";
							} else {
								document.getElementById("event2").value = event2;
							}

							event3 = doc.data().event3 ?? "None";
							if (event3.includes("!")) {
								document.getElementById("event3").value = "None";
							} else {
								document.getElementById("event3").value = event3;
							}

							event4 = doc.data().event4 ?? "None";
							if (event4.includes("!")) {
								document.getElementById("event4").value = "None";
							} else {
								document.getElementById("event4").value = event4;
							}
						});

					}).catch((e) => {
						console.log(e.message);
						setLabel('Error', 'Something went wrong :/ Please refresh the page and try again!');
					});
				});
			});
		}
	});
}

var event1 = "None";
var event2 = "None";
var event3 = "None";
var event4 = "None";

window.addEventListener("load", function () {
	var event1El = document.getElementById("event1");
	var event2El = document.getElementById("event2");
	var event3El = document.getElementById("event3");
	var event4El = document.getElementById("event4");

	event1El.addEventListener("change", () => {
		if ([event2, event3, event4].includes(event1El.value) && event1El.value != "None") {
			event1El.value = event1;

			setLabel("Error", "Please do not select a single event more than once!");
		} else {
			event1 = event1El.value;
		}
	});

	event2El.addEventListener("change", () => {
		if ([event1, event3, event4].includes(event2El.value) && event2El.value != "None") {
			event2El.value = event2;

			setLabel("Error", "Please do not select a single event more than once!");
		} else {
			event2 = event2El.value;
		}
	});

	event3El.addEventListener("change", () => {
		if ([event1, event2, event4].includes(event3El.value) && event3El.value != "None") {
			event3El.value = event3;

			setLabel("Error", "Please do not select a single event more than once!");
		} else {
			event3 = event3El.value;
		}
	});

	event4El.addEventListener("change", () => {
		if ([event1, event2, event3].includes(event4El.value) && event4El.value != "None") {
			event4El.value = event4;

			setLabel("Error", "Please do not select a single event more than once!");
		} else {
			event4 = event4El.value;
		}
	});

});

function eventsConfirm(e1, e2, e3, e4) {
	const events = [e1, e2, e3, e4];

	var checkEvents = [];

	var noneCount = 0;

	for (e of events) {
		if (e == "None") {
			noneCount++;
		} else if (checkEvents.includes(e)) {
			return false;
		} else {
			checkEvents.push(e);
		}
	}

	console.log(events);

	if (noneCount == 4) {
		return false;
	} else {
		return true;
	}
}

function competitionRegistration() {
	const e1 = document.getElementById("event1").value;
	const e2 = document.getElementById("event2").value;
	const e3 = document.getElementById("event3").value;
	const e4 = document.getElementById("event4").value;

	if (eventsConfirm(e1, e2, e3, e4)) {
		users.doc(uid).set({
			event1: e1,
			event2: e2,
			event3: e3,
			event4: e4
		}, { merge: true }).then(() => {
			setLabel("Successful", "Successfully submitted your competition registration!");
		}).catch((e) => {
			console.log(e.message);

			setLabel("Error", "Something went wrong :/ Please refresh the page and try again!");
		});
	} else {
		setLabel("Error", "Please select at least one event and do not select duplicate events!");
	}
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