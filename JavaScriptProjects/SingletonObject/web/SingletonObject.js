/**
 * app.js: В данном модуле представлен объект app, который служит для регистрации
 * новых JSON объектов и поиска по уже имеющимся.
 *
 * Структура app:
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

app.addObject = function(url, callbackFunc){
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