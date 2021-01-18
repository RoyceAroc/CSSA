window.onload = function () {
    var navxhttp = new XMLHttpRequest();
    navxhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByTagName("nav")[0].innerHTML += navxhttp.responseText;
        }
    };

    navxhttp.open("GET", "navbar.html", true);
    navxhttp.send();
}