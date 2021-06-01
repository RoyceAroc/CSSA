/* Not the best coders xD*/

var globalSynchronizedPassword="",events="";function setCookie(e,t,o){var a,s="";o&&((a=new Date).setTime(a.getTime()+24*o*60*60*1e3),s="; expires="+a.toUTCString()),document.cookie=e+"="+(t||"")+s+"; path=/"}function getCookie(e){for(var t=e+"=",o=document.cookie.split(";"),a=0;a<o.length;a++){for(var s=o[a];" "==s.charAt(0);)s=s.substring(1,s.length);if(0==s.indexOf(t))return s.substring(t.length,s.length)}return null}function eraseCookie(e){document.cookie=e+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"}function generatePassword(){for(var e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t="",o=0,a=e.length;o<8;++o)t+=e.charAt(Math.floor(Math.random()*a));return t}function create(){var e=document.getElementById("email_c").value,t=document.getElementById("username").value,o=document.getElementById("f_name").value,a=document.getElementById("l_name").value,s=document.getElementById("pwd").value,n={Email:e,Username:t,First:o,Last:a,Password:s,Google:"-"},s=new XMLHttpRequest;s.onreadystatechange=function(){4==this.readyState&&200==this.status&&(this.responseText.includes("argon")?(setCookie("email",e,365),setCookie("User",t,365),setCookie("fName",o,365),setCookie("lName",a,365),setCookie("hashedAuthCred",this.responseText,365),firebaseAuth(e,t,this.responseText),window.location="dashboard.html"):setLabel("Error",this.responseText))},s.open("POST","https://cssa-backend.herokuapp.com/registration",!0),s.setRequestHeader("Content-type","application/x-www-form-urlencoded"),s.send(JSON.stringify(n))}function login(){var e={Unknown:document.getElementById("s_username").value,Password:document.getElementById("s_pwd").value},t=new XMLHttpRequest;t.onreadystatechange=function(){var e;4==this.readyState&&200==this.status&&("Invalid Credentials"==this.responseText||"Account with that Username/Email Does Not Exist. Please create an account instead."==this.responseText?setLabel("Error",this.responseText):(setCookie("email",(e=JSON.parse(this.responseText).info)[0],365),setCookie("User",e[1],365),setCookie("fName",e[2],365),setCookie("lName",e[3],365),setCookie("hashedAuthCred",e[4],365),firebaseAuth(e[0],e[1],e[4]),window.location="dashboard.html"))},t.open("POST","https://cssa-backend.herokuapp.com/check",!0),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send(JSON.stringify(e))}function onLoad(){gapi.load("auth2",function(){gapi.auth2.init()})}window.addEventListener("load",()=>{var o,e,t;window.location.href.includes("dashboard.html")&&(o=!0,setTimeout(function(){o&&(document.getElementById("preloader").style.display="block")},2e3),e=null!=getCookie("googleToken")&&""!=getCookie("googleToken")?{user:getCookie("User"),hashCred:getCookie("googleToken")}:{user:getCookie("User"),hashCred:getCookie("hashedAuthCred")},(t=new XMLHttpRequest).onreadystatechange=function(){var e,t;4==this.readyState&&200==this.status&&("false"==this.responseText?console.log(this.responseText):("-"!=(e=JSON.parse(this.responseText).info)[5]&&(document.getElementById("referral").style.display="none",document.getElementById("userinfo").style.borderStyle="none"),t=JSON.parse(this.responseText).info,document.getElementById("updateA").value=t[2],document.getElementById("updateB").value=t[3],document.getElementById("updateC").value=t[1],document.getElementById("updateD").value=t[0],events=t[6],firebaseAuth(t[0],t[1],e[4]),document.getElementById("preloader").style.display="none",document.getElementById("competitions").style.display="block",o=!1))},t.open("POST","https://cssa-backend.herokuapp.com/getClientData",!0),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send(JSON.stringify(e)))});var googleUser={};function attachSignin(e){auth2.attachClickHandler(e,{},function(e){var s=e.getBasicProfile(),e=new XMLHttpRequest;e.onreadystatechange=function(){var e,t,o,a;4==this.readyState&&200==this.status&&("1"==this.responseText?((a=new XMLHttpRequest).onreadystatechange=function(){var e;4==this.readyState&&200==this.status&&(setCookie("email",(e=JSON.parse(this.responseText).info)[0],365),setCookie("User",e[1],365),setCookie("fName",e[2],365),setCookie("lName",e[3],365),setCookie("hashedAuthCred",e[4],365),setCookie("googleToken",s.getId(),365),firebaseAuth(e[0],e[1],e[4]),window.location="dashboard.html")},a.open("POST","https://cssa-backend.herokuapp.com/check",!0),a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o={Unknown:s.getEmail(),Password:s.getId()}):(e=s.getGivenName()+"#"+(Math.floor(9e3*Math.random())+1e3),t=generatePassword(),o=s.getFamilyName()?{Email:s.getEmail(),Username:e,First:s.getGivenName(),Last:s.getFamilyName(),Password:t,Google:s.getId()}:{Email:s.getEmail(),Username:e,First:s.getGivenName(),Last:"-",Password:t,Google:s.getId()},(a=new XMLHttpRequest).onreadystatechange=function(){4==this.readyState&&200==this.status&&(this.responseText.includes("argon")?(setCookie("email",s.getEmail(),365),setCookie("User",e,365),setCookie("fName",s.getGivenName(),365),setCookie("lName",s.getFamilyName(),365),setCookie("hashedAuthCred",this.responseText,365),setCookie("googleToken",s.getId(),365),firebaseAuth(s.getEmail(),e,this.responseText),window.location="dashboard.html"):setLabel("Error",this.responseText))},a.open("POST","https://cssa-backend.herokuapp.com/registration",!0),a.setRequestHeader("Content-type","application/x-www-form-urlencoded")),a.send(JSON.stringify(o)))},e.open("POST","https://cssa-backend.herokuapp.com/checkEmail",!0),e.setRequestHeader("Content-type","application/x-www-form-urlencoded"),e.send(s.getEmail())})}function updateProfile(){var o,a=document.getElementById("updateA").value,s=document.getElementById("updateB").value,n=document.getElementById("updateC").value,r=document.getElementById("updateD").value;if(""==a||50<a.length)setLabel("Error","Invalid First Name");else if(""==s||50<s.length)setLabel("Error","Invalid Last Name");else if(""==n||50<n.length)setLabel("Error","Invalid Username Format");else if(""==r||70<r.length)setLabel("Error","Invalid Email Format");else{let e=0,t=0;getCookie("email")==r&&(e=1),getCookie("User")==n&&(t=1),o=null!=getCookie("googleToken")&&""!=getCookie("googleToken")?{Scopecode:r,Username:n,FirstName:a,LastName:s,Init:getCookie("email"),hashCred:getCookie("googleToken"),indexA:e,indexB:t}:{Scopecode:r,Username:n,FirstName:a,LastName:s,Init:getCookie("email"),hashCred:getCookie("hashedAuthCred"),indexA:e,indexB:t};var i=new XMLHttpRequest;i.onreadystatechange=function(){4==this.readyState&&200==this.status&&("Email taken. Please choose another email"==this.responseText||"Username taken. Please choose another username"==this.responseText||"error"==this.responseText?setLabel("Error",this.responseText):(setCookie("email",r,365),setCookie("User",n,365),setCookie("fName",a,365),setCookie("lName",s,365),firebaseAuth(r,n,globalSynchronizedPassword),setLabel("Successful","Your profile has been updated!")))},i.open("POST","https://cssa-backend.herokuapp.com/updateProfile",!0),i.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i.send(JSON.stringify(o))}}function refer(){var o=document.getElementById("referA").value,e=new XMLHttpRequest;e.onreadystatechange=function(){var e,t;4==this.readyState&&200==this.status&&("1"==this.responseText?(e=null!=getCookie("googleToken")&&""!=getCookie("googleToken")?{Refer:o,Init:getCookie("email"),hashCred:getCookie("googleToken")}:{Refer:o,Init:getCookie("email"),hashCred:getCookie("hashedAuthCred")},(t=new XMLHttpRequest).onreadystatechange=function(){4==this.readyState&&200==this.status&&("error"==this.responseText?setLabel("Error","We are having trouble processing your request. Please try again later. If the problem persists, contact us at crewcssa@gmail.com."):location.reload())},t.open("POST","https://cssa-backend.herokuapp.com/refer",!0),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send(JSON.stringify(e))):setLabel("Error","The user you are trying to refer does not exist within our system. Please try again later. With more than five referrals, you will get the Referral VIP role on our community discord server."))},e.open("POST","https://cssa-backend.herokuapp.com/checkUsername",!0),e.setRequestHeader("Content-type","application/x-www-form-urlencoded"),e.send(o)}function signOut(){onLoad(),eraseCookie("email"),eraseCookie("User"),eraseCookie("fName"),eraseCookie("lName"),eraseCookie("googleToken"),eraseCookie("hashedAuthCred"),gapi.auth2.getAuthInstance().signOut().then(function(){console.log("You have signed out!")}),window.location="index.html"}function sendContact(){var e={A:document.getElementById("contact_name").value,B:document.getElementById("contact_email").value,C:document.getElementById("contact_message").value},t=new XMLHttpRequest;t.onreadystatechange=function(){4==this.readyState&&200==this.status&&("error"==this.responseText?console.log("Error B1"):setLabel("Successful","You shall be contacted within 1-2 days with a response. Thanks for your patience!"))},t.open("POST","https://cssa-backend.herokuapp.com/submitContact",!0),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send(JSON.stringify(e))}function updatePassword(e,t,o){t={email:e,password:t,oobCode:o},o=new XMLHttpRequest;o.onreadystatechange=function(){4==this.readyState&&200==this.status&&("1"==this.responseText?setLabel("Successful","Your password has been changed. Please go back and try logging in."):setLabel("Error",this.responseText.toString()))},o.open("POST","https://backend.cssa.dev/changePassword",!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.send(JSON.stringify(t))}gapi.load("auth2",function(){auth2=gapi.auth2.init({client_id:"834594227639-dntdsbdaej8rsfhspugmaft12lcorhc8.apps.googleusercontent.com",cookiepolicy:"single_host_origin"}),attachSignin(document.getElementById("google-row")),attachSignin(document.getElementById("google-row-a"))});

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
							if(event1.includes("!")) {
								document.getElementById("event1").value = "None";
							} else {
								document.getElementById("event1").value = event1;
							}
							
							event2 = doc.data().event2 ?? "None";
							if(event2.includes("!")) {
								document.getElementById("event2").value = "None";
							} else {
								document.getElementById("event2").value = event2;
							}
							
							event3 = doc.data().event3 ?? "None";
							if(event3.includes("!")) {
								document.getElementById("event3").value = "None";
							} else {
								document.getElementById("event3").value = event3;
							}

							event4 = doc.data().event4 ?? "None";
							if(event4.includes("!")) {
								document.getElementById("event3").value = "None";
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
var event1="None",event2="None",event3="None",event4="None";function eventsConfirm(){return"None"!=event1||"None"!=event2||"None"!=event3||"None"!=event4}function competitionRegistration(){eventsConfirm()?users.doc(uid).set({event1:event1,event2:event2,event3:event3,event4:event4},{merge:!0}).then(()=>{setLabel("Successful","Successfully submitted your competition registration!")}).catch(e=>{console.log(e.message),setLabel("Error","Something went wrong :/ Please refresh the page and try again!")}):setLabel("Error","Please select at least one event!")}function deleteAllCookies(){for(var e=document.cookie.split(";"),n=0;n<e.length;n++){var t=e[n],v=t.indexOf("="),t=-1<v?t.substr(0,v):t;document.cookie=t+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"}}window.addEventListener("load",function(){var e=document.getElementById("event1"),n=document.getElementById("event2"),t=document.getElementById("event3"),v=document.getElementById("event4");e.addEventListener("change",()=>{[event2,event3,event4].includes(e.value)&&"None"!=e.value?(e.value=event1,setLabel("Error","Please do not select a single event more than once!")):event1=e.value}),n.addEventListener("change",()=>{[event1,event3,event4].includes(n.value)&&"None"!=n.value?(n.value=event2,setLabel("Error","Please do not select a single event more than once!")):event2=n.value}),t.addEventListener("change",()=>{[event1,event2,event4].includes(t.value)&&"None"!=t.value?(t.value=event3,setLabel("Error","Please do not select a single event more than once!")):event3=t.value}),v.addEventListener("change",()=>{[event1,event2,event3].includes(v.value)&&"None"!=v.value?(v.value=event4,setLabel("Error","Please do not select a single event more than once!")):event4=v.value})});