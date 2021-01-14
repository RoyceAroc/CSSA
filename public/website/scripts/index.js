window.onload = function () {
    let i = 0;

    setInterval(function () {
        if (i < 20) {
            document.getElementById("header").style.paddingTop = `${15 - 0.7 * (i + 1)}%`;
            document.getElementById("header-logo").style.width = `${1 * (i + 1)}%`;

            i++;
        }
    }, 50);
}