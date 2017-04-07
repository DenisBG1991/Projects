/**
 * Заключсет элемент содержимого в фрейм, или видимую область заданной ширины
 * и высоты. Необязательные аргументы contentX и contentY определяют начальное
 * смещение содержимого относительно кадра. Фрейму передается обработчик события
 * mousewheel, который позволяет пользователю прокручивать элемент и изменять
 * размеры фрейма.
 */
function enclose(content, framewidth, frameheight, contentX, contentY) {
    framewidth = Math.max(framewidth, 50);
    frameheight = Math.max(frameheight, 50);
    contentX = Math.min(contentX, 0) || 0;
    contentY = Math.min(contentY, 0) || 0;

    var frame = document.createElement('div');
    frame.className = "enclosure";
    frame.style.width = framewidth + "px";
    frame.style.height = frameheight + "px";
    frame.style.overflow = "hidden";
    frame.style.boxSizing = "border-box";
    frame.style.webkitBoxSizing = "border-box";
    frame.style.MozBoxSizing = "border-box";

    content.parentNode.insertBefore(frame, content);
    frame.appendChild(content);

    content.style.position = "relative";
    content.style.left = contentX + "px";
    content.style.top = contentY + "px";

    // Необходимо решить некоторые проблемы совместимости браузеров
    var isMacWebkit = (navigator.userAgent.indexOf("Macintosh") !== -1 &&
    navigator.userAgent.indexOf("WebKit") !== -1);
    var isFirefox = (navigator.userAgent.indexOf("Gecko") !== -1);

    // Зарегистрировать обработчик собятий mousewheel
    frame.onwheel = wheelHandler;
    frame.onmousewheel = wheelHandler;
    if (isFirefox) {
        frame.addEventListener("DOMMouseScroll", wheelHandler, false);
    }

    function wheelHandler(event) {
        var e = event || window.event;

        /**
         * Получить величину прокрутки из объекта события, проверив свойства объекта
         * события wheel, mousewheel (в обоих случаях, 2-мкрном и 1-мерном вариантах)
         * и DOMMouseScroll в Firefox. Масштабировать значение так, чтобы один "щелчок"
         * колесика соответствовал 30 пикселам. Если какой-либо из браузеров в будущем
         * будет возбуждать оба типа событий, "wheel" и "mousewheel", одно и то же событие
         * будет обрабатываться дважды.
         */
        var deltaX = e.deltaX*(-0.2) ||      // событие wheel
        e.wheelDeltaX/4 ||                  // mousewheel
        0;                                  // событие не определено
        var deltaY = e.deltaY*(-0.2) ||
                e.wheelDeltaY/4 ||
            (e.wheelDeltaY === undefined &&     // если нет 2-мерного свойства,
            e.wheelDelta/4) ||                  // использовать 1-мерное свойство
                e.detail*(-10) ||               // событие DOMMouseScroll в Firefox
                0;

        if (isMacWebkit) {
            deltaX /= 30;
            deltaY /= 30;
        }

        if (isFirefox && e.type !== "DOMMouseScroll") {
            frame.removeEventListener("DOMMouseScroll", wheelHandler, false);
        }

        // Получить текущие размеры элемента содержимого
        var contentbox = content.getBoundingClientRect(),
            contentwidth = contentbox.right - contentbox.left,
            contentheight = contentbox.bottom - contentbox.top;

        // Если удерживается нажатой клавиша Alt, изменить размеры фрейма
        if (e.altKey) {
            if (deltaX){
                framewidth -= deltaX;
                framewidth = Math.min(framewidth, contentwidth);
                framewidth = Math.max(framewidth, 50);
                frame.style.width = framewidth + "px";
            }
            if (deltaY){
                frameheight -= deltaY;
                frameheight = Math.min(frameheight, contentheight);
                frameheight = Math.max(frameheight - deltaY, 50);
                frame.style.height = frameheight + "px";
            }
        } else {
            if (deltaX) {
                var minoffset = Math.min(framewidth - contentwidth, 0);
                contentX = Math.max(contentX + deltaX, minoffset);
                contentX = Math.min(contentX, 0);
                content.style.left = contentX + "px";
            }
            if (deltaY) {
                var minoffset = Math.min(frameheight - contentheight, 0);
                contentY = Math.min(contentY + deltaY, minoffset);
                contentY = Math.min(contentY, 0);
                content.style.top = contentY + "px";
            }
        }

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}