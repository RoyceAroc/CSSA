window.addEventListener('load', function () {
    if (getCookie('email') != null) {
        if (window.location.href.includes("sign.html")) {
            window.location.href = "dashboard.html";
        } else {
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
        }
    } else {
        if (window.location.href.includes("dashboard.html")) {
            window.location.href = "sign.html";
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
    }

    var footerxhttp = new XMLHttpRequest();
    footerxhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("footer").outerHTML = footerxhttp.responseText;
        } else if (this.readyState == 4 && this.status != 200) {
            footerxhttp.send();
        }
    };

    footerxhttp.open("GET", "footer.html", true);
    footerxhttp.send();
});

function display(elem) {
    $('#' + elem).toggle();
}