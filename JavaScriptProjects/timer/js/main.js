$(document).ready(function () {
    var SpaceTimer = document.getElementById("myTimer");
    var counter = new Counter({
        node: SpaceTimer,
        width_height: 500,
        discrete: false,
        color: {
            days: "#24090E",
            hours: "#4C000D",
            minutes: "#B10037",
            seconds: "#FF2A7E"
        }
    });
    counter.start();
    counter.set({
        d: 0,
        h: 1,
        m: 0,
        s: 0
    });
    counter.play();

    function Counter(options) {
        this.start = init;
        this.play = play;
        this.stop = stop;
        this.set = set;

        var PI2 = Math.PI / 2;
        var canvas;
        var ctx;
        var R = {};
        var cur_val = {d: null, h: null, m: null, s: null, ms: null};
        var buffer;
        var angleD, angleH, angleM, angleS;
        var cX, cY;
        var timer = null;

        function set(value) {
            if (value.d){
                cur_val.d = value.d;
            }
            if (value.h){
                cur_val.h = value.h;
            }
            if (value.m){
                cur_val.m = value.m;
            }
            if (value.s){
                cur_val.s = value.s;
            }
        }

        function check_options () {
            if (options){
                if (!options.node){
                    return false;
                }
                if (!options.width_height){
                    options.width_height = 200;
                }
                if (options.discrete === undefined){
                    options.discrete = true;
                    cur_val.ms = 0;
                } else {
                    if (!options.discrete){
                        cur_val.ms = 0;
                    }
                }
                if (!options.color){
                    options.color = {
                        days: "#111",
                        hours: "#444",
                        minutes: "#999",
                        seconds: "#ff0"
                    }
                } else {
                    if (options.color.days === undefined)
                        options.color.days = "#111";
                    if (options.color.hours === undefined)
                        options.color.hours = "#444";
                    if (options.color.minutes === undefined)
                        options.color.minutes = "#999";
                    if (options.color.seconds === undefined)
                        options.color.seconds = "#ff0";
                }
            }

            R.s = options.width_height / 2 * 0.8;
            R.m = options.width_height / 2 * 0.6;
            R.h = options.width_height / 2 * 0.4;
            R.d = options.width_height / 2 * 0.2;
            return true;
        }

        function init() {
            if (!check_options()){
                console.log("Wrong Node!");
                return false;
            }
            canvas = document.createElement("canvas");
            canvas.width = canvas.height = options.width_height;
            options.node.appendChild(canvas);

            ctx = canvas.getContext("2d");
            cX = canvas.offsetLeft + canvas.width / 2;
            cY = canvas.offsetTop + canvas.height / 2;
            ctx.save();
            ctx.lineWidth = options.width_height / 2 * 0.2;
            ctx.strokeStyle = "#262626";
            ctx.beginPath();
            ctx.arc(cX, cY, R.s, 0, PI2 * 4);
            ctx.stroke();
            ctx.strokeStyle = "#1e1e1e";
            ctx.beginPath();
            ctx.arc(cX, cY, R.m, 0, PI2 * 4);
            ctx.stroke();
            ctx.strokeStyle = "#161616";
            ctx.beginPath();
            ctx.arc(cX, cY, R.h, 0, PI2 * 4);
            ctx.stroke();
            ctx.strokeStyle = "#0e0e0e";
            ctx.beginPath();
            ctx.arc(cX, cY, R.d, 0, PI2 * 4);
            ctx.stroke();
            ctx.restore();
            buffer = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
        
        function play() {
            if (options.discrete){
                timer = setInterval(updateDiscrete, 1000);
            } else {
                timer = setInterval(updateContinues, 10);
            }
        }
        
        function stop() {
            cur_val.d = 0;
            cur_val.h = 0;
            cur_val.m = 0;
            cur_val.ms = 0;
            if (options.discrete){
                cur_val.ms = null;
            } else {
                cur_val.ms = 0;
            }
            clearInterval(timer);
        }

        function updateDiscrete() {
            ctx.putImageData(buffer, 0, 0);
            drawDays();
            drawHours();
            drawMinutes();
            drawSeconds();
            if (cur_val.s > 0){
                cur_val.s--;
            } else {
                cur_val.s = 59;
                if (cur_val.m > 0){
                    cur_val.m--;
                } else {
                    cur_val.m = 59;
                    if (cur_val.h > 0){
                        cur_val.h--;
                    } else {
                        cur_val.h = 23;
                        if (cur_val.d > 0){
                            cur_val.d--;
                        } else {
                            stop();
                        }
                    }
                }
            }
        }

        function updateContinues() {
            ctx.putImageData(buffer, 0, 0);
            drawDays();
            drawHours();
            drawMinutes();
            drawSeconds();
            if (cur_val.ms > 0){
                cur_val.ms-=10;
            } else {
                cur_val.ms = 1000;
                if (cur_val.s > 0){
                    cur_val.s--;
                } else {
                    cur_val.s = 59;
                    if (cur_val.m > 0){
                        cur_val.m--;
                    } else {
                        cur_val.m = 59;
                        if (cur_val.h > 0){
                            cur_val.h--;
                        } else {
                            cur_val.h = 23;
                            if (cur_val.d > 0){
                                cur_val.d--;
                            } else {
                                stop();
                            }
                        }
                    }
                }
            }
        }

        function drawDays() {
            ctx.save();
            if (options.discrete){
                angleD = cur_val.d * Math.PI / 500 - PI2;
            } else {
                angleD = (cur_val.d + cur_val.h / 24) * Math.PI / 500 - PI2;
            }
            ctx.lineWidth = options.width_height / 2 * 0.2;
            ctx.strokeStyle = options.color.days;
            ctx.beginPath();
            ctx.arc(cX, cY, R.d, -PI2, angleD);
            ctx.stroke();
            ctx.restore();
        }

        function drawHours() {
            ctx.save();
            if (options.discrete){
                angleH = cur_val.h * Math.PI / 12 - PI2;
            } else {
                angleH = (cur_val.h + cur_val.m / 60) * Math.PI / 12 - PI2;
            }
            ctx.lineWidth = options.width_height / 2 * 0.2;
            ctx.strokeStyle = options.color.hours;
            ctx.beginPath();
            ctx.arc(cX, cY, R.h, -PI2, angleH);
            ctx.stroke();
            ctx.restore();
        }
        
        function drawMinutes() {
            ctx.save();
            if (options.discrete){
                angleM = cur_val.m * Math.PI / 30 - PI2;
            } else {
                angleM = (cur_val.m + cur_val.s / 60) * Math.PI / 30 - PI2;
            }
            ctx.lineWidth = options.width_height / 2 * 0.2;
            ctx.strokeStyle = options.color.minutes;
            ctx.beginPath();
            ctx.arc(cX, cY, R.m, -PI2, angleM);
            ctx.stroke();
            ctx.restore();
        }

        function drawSeconds() {
            ctx.save();
            angleS = (cur_val.s + cur_val.ms * 0.001) * Math.PI / 30 - PI2;
            ctx.lineWidth = options.width_height / 2 * 0.2;
            ctx.strokeStyle = options.color.seconds;
            ctx.beginPath();
            ctx.arc(cX, cY, R.s, -PI2, angleS);
            ctx.stroke();
            ctx.restore();
        }
    }
}());