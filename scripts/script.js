var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementsByTagName("nav")[0].innerHTML += xhttp.responseText;
    }
};

xhttp.open("GET", "navbar.html", true);
xhttp.send();