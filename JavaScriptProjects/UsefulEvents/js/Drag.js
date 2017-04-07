/**
 * Drag.js: буксировка абсолютно позиционированных HTML-элементов.
 *
 * Этот можуль определяет единственную функцию drag(), которая должна вызываться
 * из обработчика события onmousedown. Последующие события mousemove будут вызывать
 * перемещение указанного элемента. Событие mouseup будет завершать буксировку.
 *
 * Аргументы:
 *
 * elementToDrag: элемент, принявший событие mousedown или содержавший его элемент.
 * Этот элемент должен иметь абсолютное позиционирование. Значения его свойств style.top
 * и style.left будут изменяться при перемещении указателя мыши пользователем.
 *
 * event: объект Event, полученный обработчиком события mousedown.
 */
function drag(elementToDrag, event) {
    function getScrollOffSet(w) {
        w = w || window;
        if (w.pageXOffset !== null) return {
            x: w.pageXOffset,
            y: w.pageYOffset
        };
        var d = w.document;
        if (document.compatMode === "CSS1Compat") return {
            x: d.documentElement.scrollLeft,
            y: d.documentElement.scrollTop
        };
        return {
            x: d.body.scrollLeft,
            y: d.body.scrollTop
        }
    }

    var scroll = getScrollOffSet(),
        startX = event.clientX + scroll.x,
        startY = event.clientY + scroll.y,
        origX = elementToDrag.offsetLeft,
        origY = elementToDrag.offsetTop,
        deltaX = startX - origX,
        deltaY = startY - origY;

    if (document.addEventListener){
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    } else if (document.attachEvent){
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);
        elementToDrag.attachEvent("onlosecapture", upHandler);
    }

    if (event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true;

    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;

    /**
     * Этот обработчик перехватывает событие mousemove, вщзникшее
     * в процессе буксировки элемента. Он отвечает за перемещение элемента.
     */
    function moveHandler(e) {
        if (!e) e = window.event;
        var scroll = getScrollOffSet();
        elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
        elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";

        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }

    /**
     * Этот обработчик перехватывает заключительное событие mouseup,
     * которое завершает операцию буксировки.
     */
    function upHandler(e) {
        if (!e) e = window.event;

        if (document.removeEventListener){
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        } else if (document.detachEvent){
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        }

        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }
}