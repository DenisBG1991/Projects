$(document).ready(function () {

    let Myclock = function(){

        let clock,ctx,cX,cY,R;
        let buffer = null;
        let now = new Date();
        let time = {
            ms:now.getMilliseconds(),
            s:now.getSeconds(),
            m:now.getMinutes(),
            h:now.getHours()
        };
        let position = {
            sec:{
                x:null,
                y:null
            },
            min:{
                x:null,
                y:null
            },
            hrs:{
                x:null,
                y:null
            }
        };
        let angleS,angleM, angleH;

        function drawClockBody(){
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = "12";
            ctx.strokeStyle = "#622D03";
            ctx.arc(cX,cY,R,0,Math.PI*2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        function drawClockFace(){
            ctx.save();
            ctx.lineWidth = 6;
            ctx.strokeStyle = 'gray';
            ctx.fillStyle = "#333";
            for(let i = 1; i < 61; i++){
                ctx.beginPath();
                let angle = i * Math.PI / 30 - Math.PI / 2;
                let dx =  Math.cos(angle) * R;
                let dy =  Math.sin(angle) * R;
                if(i%15 == 0){
                    ctx.font = '19px Tahoma';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "#A9B7C6";
                    ctx.fillText(i/5, cX + dx*0.9, cY + dy*0.9);
                }else if(i%5 == 0){
                    ctx.lineWidth = 1;
                    ctx.arc(cX + 0.9 * dx, cY + 0.9 * dy,1.5,360,0);
                    ctx.fill();
                }else{
                    ctx.lineWidth = 1;
                    ctx.arc(cX + 0.9 * dx, cY + 0.9 * dy,0.5,360,0);
                    ctx.fill();
                }
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawSeconds(){
            ctx.save();
            angleS = (time.s + time.ms * 0.001) * Math.PI/30 - Math.PI/2;
            position.sec.x = cX + Math.cos(angleS) * R * 0.88;
            position.sec.y = cY + Math.sin(angleS) * R * 0.88;
            ctx.beginPath();
            ctx.strokeStyle = "#DB1E00";
            ctx.moveTo(cX,cY);
            ctx.lineTo(position.sec.x,position.sec.y);
            ctx.stroke();
            ctx.restore();
        }

        function drawMinutes(){
            ctx.save();
            angleM = (time.m + time.s/60) * Math.PI/30 - Math.PI/2;
            position.min.x = cX + Math.cos(angleM) * R * 0.66;
            position.min.y = cY + Math.sin(angleM) * R * 0.66;
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#BC902D";
            ctx.lineCap = 'round';
            ctx.moveTo(cX,cY);
            ctx.lineTo(position.min.x,position.min.y);
            ctx.stroke();
            ctx.restore();
        }

        function drawHours(){
            ctx.save();
            angleH = (time.h + time.m/60) * Math.PI/6 - Math.PI/2;
            position.hrs.x = cX + Math.cos(angleH) * R * 0.33;
            position.hrs.y = cY + Math.sin(angleH) * R * 0.33;
            ctx.beginPath();
            ctx.lineWidth = 9;
            ctx.strokeStyle = "#F18F08";
            ctx.lineCap = 'round';
            ctx.moveTo(cX,cY);
            ctx.lineTo(position.hrs.x,position.hrs.y);
            ctx.stroke();
            ctx.restore();
        }

        function init(canvasId){
            if (canvasId && canvasId.length > 0) {
                clock = document.getElementById(canvasId);
                if(clock === null){
                    console.error('Myclock init error: элемент canvas с id = "' + canvasId + '" не найден');
                    return -1;
                }
            }else{
                console.error('Myclock init error: не задан идентификатор холста');
                return -1;
            }
            clock.width = 400;
            clock.height = 400;
            ctx = clock.getContext('2d');
            cX = clock.offsetLeft + clock.width / 2;
            cY = clock.offsetTop + clock.height /2;
            R = 150;

            drawClockBody();
            drawClockFace();
            buffer = ctx.getImageData(0, 0, clock.width, clock.height);
            setInterval(update,10);
        }

        function update(){
            now = new Date();
            time.ms = now.getMilliseconds();
            time.h = now.getHours();
            time.m = now.getMinutes();
            time.s = now.getSeconds();
            ctx.putImageData(buffer,0,0);
            drawSeconds();
            drawMinutes();
            drawHours();
        }

        this.init = init;
    };

    let myclock = new Myclock();
    myclock.init("clock");

});
