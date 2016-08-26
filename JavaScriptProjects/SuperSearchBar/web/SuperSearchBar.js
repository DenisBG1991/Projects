// Распределитель
function mainer(){
    for (var j = 0; j < arguments.length; j++){
        main(arguments[j]);
    }
}

// Основная функция.
function main(number){
    var input = document.getElementById('input' + number);
    addHandler(input, 'input', entry, number);
    addHandler(input, 'change', afterInput, number);
    addHandler(window, 'unload', unload);
}

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

// Функция обработки ввода текста в поле (input: url).
function entry(number){
    var reset = document.getElementById('reset' + number);
    var input = document.getElementById('input' + number);
    var search = document.getElementById('search' + number);
    var div = document.getElementById('hint' + number);
    var text = input.value;
    if (text != ""){
        reset.style.visibility = "visible";
        search.removeAttribute('disabled');
    }
    else {
        search.setAttribute('disabled', 'disabled');
        div.style.visibility = "hidden";
        reset.style.visibility = "hidden";
    }
}

// Функция активации кнопки очистки (reset).
function res(number){
    var reset = document.getElementById('reset' + number);
    var input = document.getElementById('input' + number);
    var search =document.getElementById('search' + number);
    var div = document.getElementById('hint' + number);
    input.value = "";
    reset.style.visibility = "hidden";
    div.style.visibility = "hidden";
    search.setAttribute('disabled', 'disabled');
}

// Функци для выпадашки подсказки.
function afterInput(number){
    var input = document.getElementById('input' + number);
    var text = input.value;
    var regexp = /(\w+):\/\/([\w.]+)\/(\S*)/;
    var result = text.match(regexp);
    if (result != null){
        var div = document.getElementById('hint' + number);
        div.style.visibility = "visible";

        var phraseOverview = document.getElementById('PhraseOverview' + number);
        phraseOverview.href = result[0];
        phraseOverview.innerHTML = result[0];

        var domainOverview = document.getElementById('DomainOverview' + number);
        domainOverview.href = "http://" + result[2];
        domainOverview.innerHTML = result[2];

        var url = result[2];
        var urlOverview = document.getElementById('URLOverview' + number);
        for (var i = 3; i < result.length; i++){
            url += "/" + result[i];
        }
        urlOverview.href = "http://" + url;
        urlOverview.innerHTML = url;
    }
}

// Создадим объект сборки
var HTTP = {};

// Массив функций, создающих объект XMLHttpRequest, работающие в различных браузерах.
HTTP._factories = [
    function() { return new XMLHttpRequest();},
    function() { return new ActiveXObject("Msxml2.XMLHTTP");},
    function() { return new ActiveXObject("Microsoft.XMLHTTP");}
];

// Хранилище для работоспособной функции, создающей объект XMLHttpRequest, которая будет запомнена
// и вызываться все остальные разы.
HTTP._factory = null;

// Вспомогательная функция для создания XMLHttpRequest объекта.
HTTP.newRequest = function() {
    if (HTTP._factory != null) return HTTP._factory();

    for (var i = 0; i < HTTP._factories.length; i++){
        try {
            var factory = HTTP._factories[i];
            var request = factory();
            if (request != null) {
                HTTP._factory = factory;
                return request;
            }
        }
        catch (e){
        }
    }

    // Если попав сюда, сценарию не удалось обнаружить подходящую функцию для создания
    // объекта, необходимо возбудить исключение в этом и всех последующих вызовах.
    HTTP._factory = function(){
        throw new Error("Объект XMLHttpRequest не поддерживается");
    };
    HTTP._factory();        // Возбудить исключение
};

function SendingRequest(number){
    var request = HTTP.newRequest();
    var n = 0;
    var timer;
    var url = "super‑analytics.com";

    if (HTTP.options.timeout) {
        timer = setTimeout(function(){
            request.abort();
            console.log("Не удалось отправить запрос.");
        }, HTTP.options.timeout);
    }
    request.onreadystatechange = function(){
        if (request.readyState == 4){
            if (timer) clearTimeout(timer);
            if (request.status == 200){
                var response = HTTP._getResponse(request);
                console.log(response);                      // запись ответа в консоль
            }
            else {
                HTTP.error(request.status, request.statusText);
                //callbackFunc(null);
            }
        }
        else {
            HTTP.options.progressHandler(n++);
        }
    };
    request.open("POST", url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(HTTP.encodeFormData(number));
}

// Составляет текст запроса.
HTTP.encodeFormData = function(number){
    var  pairs = [];
    var regexp = /%20/g;
    var input = document.getElementById('input' + number);
    var name = input.name;
    var value = input.value;
    var pair = encodeURIComponent(name).replace(regexp, "+") +
        '=' + encodeURIComponent(value).replace(regexp, "+");
    pairs.push(pair);
    return pairs.join('&');
};

// функция обработки ошибки, которая может возникнуть на сервере при запросе.
HTTP.error = function(requestStatus, requestStatusText){
    alert("Error " + requestStatus + ": " + requestStatusText);
};

// Обрабатывает полученный от сервера объект.
HTTP._getResponse = function(request){
    switch (request.getResponseHeader("Content-Type")){
        case "text/xml":
            // Если это XML-документ, вернуть объект Document.
            return request.responseXML;
        case "text/json":
        case "application/json":
        case "text/javascript":
        case "application/javascript":
        case "application/x-javascript":
            // Если это JavaScript-код или докумет  формате JSON, вызвать eval(),
            // чтобы выполнить преобразование текста в JavaScript-значение.
            return eval(request.responseText);
        default:
            // В противном случае интепретировать ответ как простой текст
            // и вернуть его как строку.
            return request.responseText;
    }
};

// Специфическая функция, в которой можно регулировать время ожидания ответа сервера и позволяющая
// отслеживать стадии работы сервера, которые записываются в console.log.
HTTP.options = {
    timeout: 10000,
    progressHandler: function(n){
        window.console.log("Значение request.readyState равно " + n + ", ожидайте завершение предыдущего запроса.")
    }
};

// Эта функция запускается перед закрытием окна для удаления всех созданных подписок на события.
function unload(){
    removeHandler(input, 'input', entry);
    removeHandler(input, 'change', afterInput);
    removeHandler(window, 'unload', unload);
}