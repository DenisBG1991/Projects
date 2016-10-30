'use strict';

// Основная функция, которая запускает обработчики сбытий.

function main() {
    var textarea = document.getElementsByTagName('textarea')[0];
    textarea.value = localStorage.getItem("text");
    var but_save = document.getElementsByTagName('input')[0];
    var but_clean = document.getElementsByTagName('input')[1];
    var param_for_save = [but_save, "click", save];
    var param_for_clean = [but_clean, "click", clean];
    var param_for_unload = [window, "unload", unload];
    addHandler.apply(undefined, param_for_save);
    addHandler.apply(undefined, param_for_clean);
    addHandler.apply(undefined, param_for_unload);
}

function save() {
    event.preventDefault();
    var textarea = document.getElementsByTagName('textarea')[0];
    var value = textarea.value;
    localStorage.setItem("text", value);
}

function clean() {
    event.preventDefault();
    var textarea = document.getElementsByTagName('textarea')[0];
    textarea.value = "";
}

// Эта функция запускается перед закрытием окна для удаления всех созданных подписок на события.
function unload() {
    //noinspection JSUnresolvedVariable
    removeHandler(textarea, 'focus', entry);
    removeHandler(window, 'unload', unload);
}

//# sourceMappingURL=main-compiled.js.map