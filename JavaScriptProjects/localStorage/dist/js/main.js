// Данная функция корректным образом запускает подписки на события.
function addHandler(object, event, handler, parameters, useCapture) {
    if (object.addEventListener) {
        object.addEventListener(event, handler.bind(null, parameters), useCapture ? useCapture : false);
    } else if (object.attachEvent) {
        object.attachEvent('on' + event, handler.bind(null, parameters));
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

// Основная функция, которая запускает обработчики сбытий.
function main() {
    var input = document.getElementsByTagName('input')[0];
    var button = document.getElementsByTagName('button')[0];
    addHandler(input, 'input', entry);
    addHandler(button, 'click', save);
    addHandler(window, 'unload', unload);
}

// Функция поиска Имя/Значение из localStorage хранилища.
function entry() {
    var input = document.getElementsByTagName('input')[0];
    var text = input.value;
    var pattern = /#\w+/;
    var tag = text.match(pattern)[0];
    if (tag != null) {
        var name = tag.substring(1);
        var value = localStorage.getItem(name);
        if (value != null) {
            // Три представления результата:
            //1.
            var history = document.getElementsByTagName('p')[0];
            var result = document.getElementsByTagName('article')[1];
            result.className = result.className + " vision";
            history.textContent = value;
            //2.
            //input.value = input.value + " " + value;
            //3.
            //alert(value);
        }
    }
}

// Функция записи Имя/Значение в localStorage хранилище.
function save() {
    var input = document.getElementsByTagName('input')[0];
    var text = input.value;
    var pattern = /#\w+(\s\w+){1,10}/;
    var item = text.match(pattern)[0];
    if (item != null) {
        var space = item.indexOf(' ');
        var name = item.substring(1,space);
        var value = item.substring(space+1);
        localStorage.setItem(name, value);
    }
}

// Эта функция запускается перед закрытием окна для удаления всех созданных подписок на события.
function unload(){
    removeHandler(input, 'input', entry);
    removeHandler(button, 'click', save);
    removeHandler(window, 'unload', unload);
}
