window.addEventListener('load', function () {
    if(getCookie('email') != null) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementsByTagName("nav")[0].innerHTML = xhttp.responseText;
            } else if (this.readyState == 4 && this.status != 200) {
                xhttp.send();
            }
        };

        xhttp.open("GET", "navbarA.html", true);
        xhttp.send();
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementsByTagName("nav")[0].innerHTML = xhttp.responseText;
            } else if (this.readyState == 4 && this.status != 200) {
                xhttp.send();
            }
        };

        xhttp.open("GET", "navbarB.html", true);
        xhttp.send();
    }
});