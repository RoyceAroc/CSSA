function create() {
	let emailC = document.getElementById("email_c").value;
	var usr = document.getElementById("username").value;
	var fName = document.getElementById("f_name").value;
	var lName = document.getElementById("l_name").value;
	var pwd = document.getElementById("pwd").value;
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "checkUsername", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(usr); 
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == 1) {
				alert("Username taken");
			} else {
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "checkEmail", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(emailC); 
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText == 1) {
							alert("This email is already in use");
						} else {
							var values = {Email: emailC, Username: usr, First: fName, Last: lName ,  Password:pwd};
							var xhttp = new XMLHttpRequest();
							xhttp.open("POST", "registration", true);
							xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xhttp.send(JSON.stringify(values)); 
							xhttp.onreadystatechange = function() {
								if (this.readyState == 4 && this.status == 200) {
									if(this.responseText == "1") {
										localStorage.setItem("email", emailC);
										localStorage.setItem("User", usr);
										localStorage.setItem("fName", fName);
										localStorage.setItem("lName", lName);
										window.location.href = "environment/dashboard";
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
	xhttp.open("POST", "check", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(values));
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "false") {
				alert("Login Failure");
			} else {
				let valueArray = JSON.parse(this.responseText).info;
				localStorage.setItem("email", valueArray[0]);
				localStorage.setItem("User", valueArray[1]);
				localStorage.setItem("fName", valueArray[2]);
				localStorage.setItem("lName", valueArray[3]);
				window.location.href = "environment/dashboard";
			}
		} 
	}; 
}


function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('Given Name: ' + profile.getGivenName());
	console.log('Family Name: ' + profile.getFamilyName());
	console.log("Email: " + profile.getEmail());
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "checkEmail", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(emailC); 
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == 1) {
				alert("This email is already in use");
			} else {
				//Work in progress [Make custom username w/ while loop across retention flow check & login]
			}
		} 
	}; 
}



function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
	});
}