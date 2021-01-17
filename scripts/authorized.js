var boolCheck = false;

function create() {
	let emailC = document.getElementById("email_c").value;
	var usr = document.getElementById("username").value;
	var fName = document.getElementById("f_name").value;
	var lName = document.getElementById("l_name").value;
	var pwd = document.getElementById("pwd").value;
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://backend.cssa.dev/checkUsername", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(usr); 
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == 1) {
				alert("Username taken");
			} else {
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "https://backend.cssa.dev/checkEmail", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(emailC); 
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText == 1) {
							alert("This email is already in use");
						} else {
							var values = {Email: emailC, Username: usr, First: fName, Last: lName ,  Password:pwd};
							var xhttp = new XMLHttpRequest();
							xhttp.open("POST", "https://backend.cssa.dev/registration", true);
							xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xhttp.send(JSON.stringify(values)); 
							xhttp.onreadystatechange = function() {
								if (this.readyState == 4 && this.status == 200) {
									if(this.responseText == "1") {
										setCookie('email',emailC,365);
										setCookie('User',usr,365);
										setCookie('fName',fName,365);
										setCookie('lName',lName,365);
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
	xhttp.open("POST", "https://backend.cssa.dev/check", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(values));
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "false") {
				alert("Login Failure");
			} else {
				let valueArray = JSON.parse(this.responseText).info;
				setCookie('email',valueArray[0],365);
				setCookie('User',valueArray[1],365);
				setCookie('fName',valueArray[2],365);
				setCookie('lName',valueArray[3],365);
				window.location.href = "environment/dashboard";
			}
		} 
	}; 
}


function onSignIn(googleUser) {
	if(boolCheck == true) {
		var profile = googleUser.getBasicProfile();
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://backend.cssa.dev/checkEmail", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(profile.getEmail()); 
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if(this.responseText == 1) {
					//Account already exists | set profile
					var xhttp = new XMLHttpRequest();
					xhttp.open("POST", "https://backend.cssa.dev/gleUsername", true);
					xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhttp.send(profile.getEmail()); 
					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							let valueArray = JSON.parse(this.responseText).info;
								setCookie('email',valueArray[0],365);
								setCookie('User',valueArray[1],365);
								setCookie('fName',valueArray[2],365);
								setCookie('lName',valueArray[3],365);
							//window.location.href = "environment/dashboard";
						} 
					}; 
				} else 	{
					let username = profile.getGivenName() + "#" + (Math.floor(Math.random() * 9000) + 1000);
					let password = generatePassword();
					var values = {Email: profile.getEmail(), Username: username, First: profile.getGivenName(), Last: profile.getFamilyName() ,  Password:password};
					var xhttp = new XMLHttpRequest();
					xhttp.open("POST", "https://backend.cssa.dev/registrationA", true);
					xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhttp.send(JSON.stringify(values)); 
					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							if(this.responseText == "1") {
								setCookie('email',profile.getEmail(),365);
								setCookie('User',username,365);
								setCookie('fName',profile.getGivenName(),365);
								setCookie('lName',profile.getFamilyName(),365);
								window.location.href = "environment/dashboard";
							} 
						} 
					}; 
				}
			} 
		}; 
	}
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
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		boolCheck = true;
	});
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

window.onload = function() {
	if(getCookie('email')) {
		window.location.href = "environment/dashboard";
	} else {
		document.getElementById("autor").click();
	}
}

