/**
 * app.js: В данном модуле представлен объект app, который служит для регистрации
 * новых JSON объектов и поиска по уже имеющимся.
 *
 * Структура app (без сервера):
 *
 *      Функция-конструктор служит для решистрации экземпляров объекта и
 *      инициализации свойств экземпляров, таких как:
 *          @param tag
 *          @param content
 *          @param attr
 *          @param events
 *          @param style
 *
 *      Свойство объекта app.arrayOfObjectsApp является своего рода контейнером
 *      для новых JSON объектов. Все добавленные объекты попадают именно туда.
 *
 *      Метод экземпляров объекта app.prototype.pushObject реализует добавление
 *      новых объектов в контейнер.
 *
 *      Метод объекта app.createObject создает экземпляр объект app из имеющегося
 *      шаблона JSON объекта (Assembly.js) и последующем вызовом метода, уже созданного
 *      экземпляра объекта, app.prototype.pushObject.
 *
 *      Метод объекта app.addObject осуществляет поиск объекта по url-адресу и
 *      вызов соответствующей функции обработки полученного объекта.
 *
 *      Мотод объекта app.equals служит инструментом сравнения двух строк.
 *
 * Структура app (с участием сервера):
 *
 *      app.HTTP: специальный объект, который будет осуществлять всю работу
 *      по протаколу http.
 *
 *      app.HTTP._factories: массив функций, создающих объект XMLHttpRequest,
 *      работающие в различных браузерах.
 *
 *      app.HTTP._factory: хранилище для работоспособной функции, создающей
 *      объект XMLHttpRequest, которая будет запомнена и вызываться все остальные разы.
 *
 *      app.HTTP.newRequest: вспомогательная функция для создания XMLHttpRequest объекта.
 *
 *      app.addObject: основная функция, осуществляющая запрос JSON-объета по указанному
 *      в параметрах url адресу. Данная функция работает в три этапа: вначеле создает
 *      новый запрос вызовом функции app.HTTP.newRequest, потом осуществляет прослушку
 *      посредством создания очереди с периодом ожидания. Если запрос еще полностью не обработан,
 *      то новый запрос не может быть начат. Наконец последний этап данной функции это обработка
 *      ответа от сервера: в случае положительного ответа создается объект по средствам функции
 *      app.HTTP._getResponse и последущем вызозове функции callbackFunc с передачей полученного
 *      объекта в нее. В случае отрицательного ответа, вызывается функция app.error, для обработки
 *      ошибки сервера.
 *
 *      app.HTTP._getResponse: обрабатывает полученный от сервера объект и преобразует его в
 *      html объект.
 *
 *      app.error: функция обработки ошибки, которая может возникнуть на сервере при запросе.
 *
 *      app.HTTP.options: специфическая функция, в которой можно регулировать время ожидания
 *      ответа сервера и позволяющая отслеживать стадии работы сервера, которые записываются
 *      в console.log.
 */
function app(tag, content, attr, events, style){
    this.tag = tag;
    this.content = content;
    this.attr = attr;
    this.events = events;
    this.style = style;
}

app.arrayOfObjectsApp = [];

app.prototype.pushObject = function(){
    app.arrayOfObjectsApp.push(this);
};

app.createObject = function(object){
    var tag = "";
    var content = "";
    var attr = {};
    var events = {};
    var style = {};
    for (var obj in object){
        if (obj == "tag") tag = object[obj];
        if (obj == "content") content = object[obj];
        if (obj == "attr") attr = object[obj];
        if (obj == "events") events = object[obj];
        if (obj == "style") style = object[obj];
    }
    var objectApp = new app(tag, content, attr, events, style);
    objectApp.pushObject();
};

app.addObjectWithOutServer = function(url, callbackFunc){
    if (url == null || url == ""){
        alert("Не указан адрес запроса JSON объекта.");
    }
    else {
        try {
            if (typeof url != "string") url = url.toString();
        }
        catch (e){
            alert("Ошибка " + e + ": введен не корректный адрез запроса JSON объекта.");
        }

        if (typeof callbackFunc != "function") {
            alert("Второй аргумент должен быть функцией.");
        }
        else {
            for (var i = 0; i < app.arrayOfObjectsApp.length; i++){
                var obj = app.arrayOfObjectsApp[i];
                for (var properties in obj.attr){
                    var urlJson = "";
                    if(properties == "href") {
                        urlJson = obj.attr[properties];
                    }
                    if (app.equals(urlJson, url)){
                        var newTeg = "<"+obj.tag+" ";
                        for (var prop in obj.attr){
                            newTeg = newTeg + prop + "=\"" + obj.attr[prop] + "\" ";
                        }
                        for (var prop in obj.events){
                            newTeg = newTeg + "on" + prop + "=\"" + obj.events[prop] + "\" ";
                        }
                        newTeg = newTeg + "style=\"";
                        for (var prop in obj.style){
                            newTeg = newTeg + prop + ": " + obj.style[prop] + "; ";
                        }
                        newTeg = newTeg + "\">"+ obj.content + "</" + obj.tag + ">";
                        callbackFunc(newTeg);
                    }
                }
            }
        }
    }
};

app.equals = function (target1, target2){
    var equals;
    if (target1.length != target2.length) {
        equals = false;
        return equals;
    }
    else {
        var massTarget1 = target1.split('');
        var massTarget2 = target2.split('');
        for (var j = 0; j < massTarget2.length; j++){
            if (massTarget1[j] != massTarget2[j]) {
                equals = false;
                return equals;
            }
        }
        equals = true;
    }
    return equals;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.HTTP = {};

app.HTTP._factories = [
    function() { return new XMLHttpRequest();},
    function() { return new ActiveXObject("Msxml2.XMLHTTP");},
    function() { return new ActiveXObject("Microsoft.XMLHTTP");}
];

app.HTTP._factory = null;

app.HTTP.newRequest = function() {
    if (app.HTTP._factory != null) return app.HTTP._factory();

    for (var i = 0; i < app.HTTP._factories.length; i++){
        try {
            var factory = app.HTTP._factories[i];
            var request = factory();
            if (request != null) {
                app.HTTP._factory = factory;
                return request;
            }
        }
        catch (e){
        }
    }

    // Если попав сюда, сценарию не удалось обнаружить подходящую функцию для создания
    // объекта, необходимо возбудить исключение в этом и всех последующих вызовах.
    app.HTTP._factory = function(){
        throw new Error("Объект XMLHttpRequest не поддерживается");
    };
    app.HTTP._factory();        // Возбудить исключение
};

app.addObject = function(url, callbackFunc){
    var request = app.HTTP.newRequest();
    var n = 0;
    var timer;
    if (app.HTTP.options.timeout) {
        timer = setTimeout(function(){
            request.abort();
            app.addObject(url, callbackFunc);
        }, app.HTTP.options.timeout);
    }
    request.onreadystatechange = function(){
        if (request.readyState == 4){
            if (timer) clearTimeout(timer);
            if (request.status == 200){
                callbackFunc(app.HTTP._getResponse(request))
            }
            else {
                app.error(request.status, request.statusText);
                callbackFunc(null);
            }
        }
        else {
            app.HTTP.options.progressHandler(n++);
        }
    };
    request.open("GET", url);
    request.setRequestHeader("Content-Type","text/json");
    request.send(null);
};

app.HTTP._getResponse = function(request){
    switch (request.getResponseHeader("Content-Type")){
        case "text/xml":
            // Если это XML-документ, вернуть объект Document.
            return request.responseXML;
        case "text/json":
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

app.error = function(requestStatus, requestStatusText){
    alert("Error " + requestStatus + ": " + requestStatusText);
};

app.HTTP.options = {
    timeout: 100000,
    progressHandler: function(n){
        window.console.log("Значение request.readyState равно " + n + ", ожидайте завершение предыдущего запроса.")
    }
};



