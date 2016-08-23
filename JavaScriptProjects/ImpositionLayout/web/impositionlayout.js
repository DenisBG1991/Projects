/**
 * Вся программа состоит из одной функции запуска start(), функции
 * подписки на события, функций обработки возникающих подписок на события
 * и втростепенной функции delta() для рассчета направления прокрутки.
 */
function main(){
    //addHandler(window, 'DOMMouseScroll', wheel);
    //addHandler(window, 'mousewheel', wheel);
    //addHandler(window, 'scroll', wheel);
    addHandler(window, 'wheel', wheel);
}

// Данная функция корректным образом запускает подписки на события.
function addHandler(object, event, handler, useCapture) {
    if (object.addEventListener) {
        object.addEventListener(event, handler, useCapture ? useCapture : false);
    } else if (object.attachEvent) {
        object.attachEvent('on' + event, handler);
    } else alert("Add handler is not supported");
}

// Данная функция корректным образом останавливает подписки на события.
function removeHandler(object, event, handler, useCapture) {
    if (object.addEventListener) {
        object.removeEventListener(event, handler, useCapture ? useCapture : false);
    } else if (object.attachEvent) {
        object.attachEvent('on' + event, handler);
    } else alert("Remove handler is not supported");
}

/**
 * Дальше идут функции обработок возникающих событий. Весь процесс разбит на
 * пыть фаз: фаза один (wheel) - прокрутка документа до прилипания блока #1 к нижней
 * границе, фаза два (beginningScroll) - захват блока #1 при последующей прокрутке вверх,
 * фаза три (continueScrollBotFaze) - фариации прокруток вверх/вниз после захвата,
 * фаза четыре (continueScrollMidFaze) - прокрутка документа до прилипании блока #1
 * к верхней границе, фаза пять (continueScrollTopFaze) - аналогичка фазе три только
 * на верхней границе. Пятая фаза заканчивается обходом всего цикла и завершением
 * подписок на события. После чего стартующая * подписка на событие открывается вновь
 * и начинается все с начала.
 */
function wheel() {              // Фаза один
    var delta = deltas();

    if (delta < 0){
        // Рассчет положения рамки #1 и ожидание конкретной координаты.
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 3250) {
            document.getElementById('div1').style.position = "absolute";
            document.getElementById('div1').style.top = "3250px";

            // С этого момента начинается учет направления прокрутки (вверх/вниз)
            // при помощи метода delta() и последующие этому события.

            //addHandler(window, 'DOMMouseScroll', beginningScroll);
            //addHandler(window, 'mousewheel', beginningScroll);
            //addHandler(window, 'scroll', beginningScroll);
            addHandler(window, 'wheel', beginningScroll);
        }
    }
}

function beginningScroll(){             // Фаза два
    var delta = deltas();

    if (delta > 0) {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled < 2743) {
            document.getElementById('div1').style.position = "fixed";
            document.getElementById('div1').style.top = "607px";

            //addHandler(window, 'DOMMouseScroll', continuescrollBotFaze);
            //addHandler(window, 'mousewheel', continuescrollBotFaze);
            //addHandler(window, 'scroll', continueScrollBotFaze);
            addHandler(window, 'wheel', continueScrollBotFaze);
        }
    }
}

function continueScrollBotFaze(){           // Фаза три
    var delta1 = deltas();
    var delta2 = deltas();

    if (delta1 < 0){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 2593){
            document.getElementById('div1').style.position = "absolute";
            document.getElementById('div1').style.top = "3250px";

            //addHandler(window, 'DOMMouseScroll', beginningScroll);
            //addHandler(window, 'mousewheel', beginningScroll);
            //addHandler(window, 'scroll', beginningScroll);
            addHandler(window, 'wheel', beginningScroll);
        }
    }

    if (delta2 > 0) {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled < 1250) {
            document.getElementById('div1').style.position = "absolute";
            document.getElementById('div1').style.top = "1750px";

            //addHandler(window, 'DOMMouseScroll', continueScrollMidFaze);
            //addHandler(window, 'mousewheel', continueScrollMidFaze);
            //addHandler(window, 'scroll', continueScrollMidFaze);
            addHandler(window, 'wheel', continueScrollMidFaze);
        }
    }
}

function continueScrollMidFaze(){
    var delta = deltas();

    if (delta < 0){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 1750){
            document.getElementById('div1').style.position = "fixed";
            document.getElementById('div1').style.top = "0px";

            //addHandler(window, 'DOMMouseScroll', continueScrollTopFaze);
            //addHandler(window, 'mousewheel', continueScrollTopFaze);
            //addHandler(window, 'scroll', continueScrollTopFaze);
            addHandler(window, 'wheel', continueScrollTopFaze);
        }
    }
    else {
        document.getElementById('div1').style.position = "absolute";
        document.getElementById('div1').style.top = "1750px";
    }
}

function continueScrollTopFaze (event){
    var delta1 = deltas(event);
    var delta2 = deltas();

    if (delta1 > 0){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled < 1750){
            document.getElementById('div1').style.position = "absolute";
            document.getElementById('div1').style.top = "1750px";

            //addHandler(window, 'DOMMouseScroll', continueScrollMidFaze);
            //addHandler(window, 'mousewheel', continueScrollMidFaze);
            //addHandler(window, 'scroll', continueScrollMidFaze);
            addHandler(window, 'wheel', continueScrollMidFaze);
        }
        else {
            document.getElementById('div1').style.position = "fixed";
            document.getElementById('div1').style.top = "0px";
        }
    }

    if (delta2 < 0) {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;

        if (scrolled > 3250) {
            document.getElementById('div1').style.position = "absolute";
            document.getElementById('div1').style.top = "3250px";

            //removeHandler(window,'DOMMouseScroll',wheel);
            //removeHandler(window, 'DOMMouseScroll', beginningScroll);
            //removeHandler(window,'DOMMouseScroll',continueScrollBotFaze);
            //removeHandler(window,'DOMMouseScroll',continueScrollMidFaze);
            //removeHandler(window,'DOMMouseScroll',continueScrollTopFaze);

            //removeHandler(window,'mousewheel',wheel);
            //removeHandler(window, 'mousewheel', beginningScroll);
            //removeHandler(window,'mousewheel',continueScrollBotFaze);
            //removeHandler(window,'mousewheel',continueScrollMidFaze);
            //removeHandler(window,'mousewheel',continueScrollTopFaze);

            //removeHandler(window,'scroll',wheel);
            //removeHandler(window, 'scroll', beginningScroll);
            //removeHandler(window,'scroll',continueScrollBotFaze);
            //removeHandler(window,'scroll',continueScrollMidFaze);
            //removeHandler(window,'scroll',continueScrollTopFaze);

            removeHandler(window,'wheel',wheel);
            removeHandler(window, 'wheel', beginningScroll);
            removeHandler(window,'wheel',continueScrollBotFaze);
            removeHandler(window,'wheel',continueScrollMidFaze);
            removeHandler(window,'wheel',continueScrollTopFaze);

            //addHandler(window, 'DOMMouseScroll', wheel);
            //addHandler(window, 'mousewheel', wheel);
            //addHandler(window, 'scroll', wheel);
            addHandler(window, 'wheel', wheel);
        }
    }
}

// Эта функция предназначена для рассчета направления прокрутке документа
// Значению -1 соответствует прокрутка вниз, а значению 1 - прокрутка вверх.
function deltas(){
    var delta;
    var event = window.event;
    // Определение направления прокрутки.
    if (event.deltaY) {
        delta = -event.deltaY/100;
    }
    else if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
    } else if (event.detail) {
        delta = -event.detail / 3;
    }
    return delta;
}
