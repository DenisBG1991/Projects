/**
 * InputFilter.js: фильтрация ввода для элементов <input>
 *
 * Этот модуль отыскивает все элементы <input type="text"> в документе, имеющие
 * атрибут "data-allowed-chars". Регистрирует обработчики событий keypress, textInput
 * и textinput для этих элементов, чтобы ограничить набор допустимых для ввода символов,
 * чтобы разрешить вводить только символы, указанные в атрибуте. Если элемент <input>
 * также имеет атрибут "data-messageid", значение этого атрибута интерпретируется как id
 * другого элемента документа. Если пользователь вводит недопустимый символ, элемент с
 * указанным id делается невидимым. Если пользователь вводит допустимый символ, элемент
 * с сообщением скрывается. Данный элемент с сообщением предназначается для вывода
 * пояснений, почему ввод пользователя был отвергнут. Его оформление необходимо реализовать
 * с помощью CSS так, чтобы изначально он был невидим.
 *
 * Ниже приводится образец разметки HTML, использующей этот модуль.
 * <input id="zip" type="text" data-allowed-chars="0123456789" data-messageid="zipwarn">
 * <span id="zipwarn" style="color: red; visibility: hidden">Только цифры</span>
 *
 * Этот модуль полностью реализован в ненавязчивом стиле: он не определяет никаких
 * переменных в глобальном пространстве имен.
 */
whenReady(function () {
    var inputelts = document.getElementsByTagName("input");

    for(var i = 0; i < inputelts.length; i++) {
        var elt = inputelts[i];

        if (elt.type !== "text" || !elt.getAttribute("data-allowed-chars")) continue;

        if (elt.addEventListener) {
            elt.addEventListener("keypress", filter, false);
            elt.addEventListener("textInput", filter, false);
            elt.addEventListener("textinput", filter, false);
        } else {
            elt.attachEvent("onkeypress", filter);
        }
    }

    function filter(event) {
        var e = event || window.event,
            target = e.target || e.srcElement,
            text = null;

        if (e.type === "textinput" || e.type === "textInput") {
            text = e.data;
        }
        else {
            var code = e.charCode || e.keyCode;

            if (code < 32 || e.charCode === 0 || e.ctrlKey || e.altKey) return;
            text = String.fromCharCode(code);
        }

        var allowed = target.getAttribute("data-allowed-chars"),
            messageid = target.getAttribute("data-messageid");

        if (messageid) {
            var messageElement = document.getElementById(messageid);
        }

        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if (allowed.indexOf(c) === -1) {
                if (messageElement) messageElement.style.visibility = "visible";
                if (e.preventDefault) e.preventDefault();
                if (e.returnValue) e.returnValue = false;
                return false;
            }
        }

        if (messageElement) messageElement.style.visibility = "hidden";
    }
});