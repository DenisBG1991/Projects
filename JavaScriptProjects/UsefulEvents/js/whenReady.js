/**
 * передайте функции whenReady() свою функцию, и она вызовет ее
 * (как метод объекта документа), как только завершится синтаксический анализ
 * документа и он будет готов к выполнению операций. Зарегистрированные функции
 * вызываются при первом же событии DOMContentLoaded, readystatechange или load.
 * Как только документ будет готов и будут вызваны все фугкции, whenReady()
 * немедленно вызовет все функции, которые были ей переданы.
 */
const whenReady = (function () {
    var funcs = [],         // Функции, которые должны вызываться по событию
        ready = false;      // Поличит значение true про вызове функции handler

    function handler(e) {
        if (ready) return;
        if (e.type === "readystatechange" && document.readyState !== "complete") return;
        for (var i = 0; i < funcs.length; i++){
            funcs[i].call(document);
        }
        console.log(e.type);
        ready = true;
        funcs = null;
    }

    // Зарегистрировать обработчит handler для всех ожидаемых событий
    if (document.addEventListener){
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    } else if (document.attachEvent){
        document.attachEvent("readystatechange", handler);
        window.attachEvent("onload", handler);
    }

    // Вернуть функцию whenReady
    return function whenReady(f) {
        if (ready) f.call(document);
        else funcs.push(f);
    }
}());
