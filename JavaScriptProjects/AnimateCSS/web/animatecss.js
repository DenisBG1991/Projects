/**
 * AnimateCSS.js:
 * Этот файл определяет функцию с именем animateCSS(), служащую основой
 * для создания анимации на базе CSS. Аргументы функции:
 *
 *      element: Анимируемы HTML-элемент.
 *      numFrames: Общее число кадров в анимации.
 *      timePerFrame: Количиство миллисекунд отображения каждого кажра.
 *      animation: Объект, определяющий анимацию; описывается далее.
 *      whendone: Необязательная функция, вызываемая по завершении анимации.
 *                Если функция указана, ей в качестве аргумента передается
 *                значение аргумента element.
 *
 * Функция animateCSS() просто определяет платформу для анимации. Выполняемую
 * анимацию определяют свойства объекта animation. Каждое свойство должно
 * иметь то же имя, что и свойство CSS-стиля. Значением каждого свойства
 * должна быть функция, возвращающая значение для этого свойства стиля.
 * Каждой функции передается номер кадра и общий промежуток времени, прошедший
 * с начала анимации, а функция может использовать это для вычисления
 * значения стиля, которое она должна вернуть для данного фрейма.
 * Например, чтобы анимировать изображение так, чтобы оно передвигалось
 * из левого верхнего угла, вы можете вызвать функцию animateCSS так:
 *
 * animateCSS(image, 25, 50,
 *            {top: function(frame, time) {return frame*8 + "px"; },
 *            left: function(frame, time) {return frame*8 + "px"; }
 *            });
 */
function animateCSS(element, numFrames, timePerFrame, animation, whendone){
    var frame = 0;
    var time = 0;

    // Определить вызов displayNextFrame() каждые timePerFrame миллисекунд.
    // Так будет отображаться каждый кадр анимации.
    var intervalId = setInterval(displayNextFrame, timePerFrame);

    // На этом работа animateCSS() завершается, но предыдущая строка гарантирует,
    // что следующая вложенная функция будет вызываться для каждого кадра анимации.
    function displayNextFrame(){
        if (frame >= numFrames) {       // Проверить, не закончилась ли анимация
            clearInterval(intervalId);  // Если да - прекратить вызов
            if (whendone) whendone(element);    // Вызвать функцию whendone
            return;                             // и завершить работу
        }

        // Обойти в цикле все свойства, определяемые объектом анимации
        for (var cssprop in animation){
            // Для каждого свойства вызвать его функцию анимации, передавая
            // ей номер кадра и прошедшее впемя. Используем возвращаемое
            // функцией значение в качестве нового значения соответствующего
            // свойства стиля для указанного элемента. Используем блок
            // try/catch, чтобы игнорировать любые исключительные ситуации,
            // возникающие из-за неверных возвращаемых значений.
            var unframe = 150-(frame-150);
            try {
                if (cssprop == "clip"){
                    if (frame < 150){
                        //element.style.visibility = "hidden";
                        element.style[cssprop] = animation[cssprop](frame);
                    }
                    else {
                        element.style.visibility = "visible";
                        element.style[cssprop] = animation[cssprop](unframe);
                    }
                }
                else {
                    element.style[cssprop] = animation[cssprop](frame);
                }
            }catch (e){}
        }
        frame++;
        time += timePerFrame;
    }
}

function animato(){
    animateCSS(document.getElementById("title"), 300, 20,
        {top: function(f) {return 600-f*2 + "px";},
            clip: function(f) {return "rect("+f+"px auto auto auto)";}});
}

function animats(){
    animateCSS(document.getElementById("titl"), 300, 20,
        {left: function(f) {return 400 + 100*Math.cos(f/8) + "px"},
            top: function(f) {return 400 + 100*Math.sin(f/8) + "px"}});
}

if (window.addEventListener) window.addEventListener("load", animato, false);
else if (window.attachEvent) window.attachEvent("onload", animato);

if (window.addEventListener) window.addEventListener("load", animats, false);
else if (window.attachEvent) window.attachEvent("onload", animats);