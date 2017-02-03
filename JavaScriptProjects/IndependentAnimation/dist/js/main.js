function shake(e, oncomplete, ownArguments, secondaryArguments) {
    var distance = ownArguments["distance"],
        time = ownArguments["time"],
        delay = ownArguments["delay"];

    console.log(distance + " " + time + " " + delay);

    if (typeof e === "string") e = document.getElementById(e);
    if (!time) time = 500;
    if (!distance) distance = 5;
    if (!delay) delay = 0;

    var originalStyle = e.style.cssText;
    e.style.position = "relative";
    var start;
    setTimeout(function () {
        start = (new Date()).getTime();
        animateShake();
    }, delay);

    function animateShake() {
        var now = (new Date()).getTime(),
            elapsed = now - start,
            fraction = elapsed / time;

        if (fraction < 1) {
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";
            setTimeout(animateShake, Math.min(25, time - elapsed))
        }
        else {
            e.style.cssText = originalStyle;
            if (oncomplete) oncomplete(e, null, secondaryArguments, null);
        }
    }
}

function fadeOut(e, oncomplete, ownArguments, secondaryArguments){
    var time = ownArguments["time"],
    delay = ownArguments["delay"];

    if (typeof e === "string") e = document.getElementById(e);
    if (!time) time = 500;
    if (!delay) delay = 0;

    var ease = Math.sqrt,
        start = (new Date()).getTime();

    setTimeout(function () {
        animateFadeOut();
    }, delay);

    function animateFadeOut() {
        var elapsed = (new Date()).getTime() - start,
            fraction = elapsed/time;
        if (fraction < 1) {
            var opacity = 1 - ease(fraction);
            e.style.opacity = String(opacity);
            setTimeout(animateFadeOut, Math.min(25, time - elapsed));
        }
        else  {
            e.style.opacity = "0";
            if (oncomplete) oncomplete(e, null, secondaryArguments, null);
        }
    }
}

$(document).ready(function () {
   var img = document.querySelector(".wrapper > img"),
       forShake = {
       "distance" : 70,
           "time": 500,
           "delay": 2000
       },
       forFadeOut = {
       "time": 600,
           "delay": 300
       };
   shake(img, fadeOut, forShake, forFadeOut);
});
