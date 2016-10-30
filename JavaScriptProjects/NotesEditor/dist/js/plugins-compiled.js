'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addHandler = addHandler;
// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function noop() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = window.console = window.console || {};

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
})();

// Place any jQuery/helper plugins in here.

// Данная функция корректным образом запускает подписки на события.
function addHandler(object, event, handler, parameters) {
    var useCapture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (object.addEventListener) {
        object.addEventListener(event, handler.bind(null, parameters), useCapture);
    } else if (object.attachEvent) {
        object.attachEvent('on' + event, handler.bind(null, parameters));
    } else alert("Add handler is not supported");
}

// Данная функция корректным образом останавливает подписки на события.
function removeHandler(object, event, handler) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (object.addEventListener) {
        object.removeEventListener(event, handler, useCapture);
    } else if (object.attachEvent) {
        object.attachEvent('on' + event, handler);
    } else alert("Remove handler is not supported");
}

//# sourceMappingURL=plugins-compiled.js.map