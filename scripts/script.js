window.addEventListener('load', function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByTagName("nav")[0].innerHTML = xhttp.responseText;
        } else if (this.readyState == 4 && this.status != 200) {
            xhttp.send();
        }
    };

    xhttp.open("GET", "navbar.html", true);
    xhttp.send();
});