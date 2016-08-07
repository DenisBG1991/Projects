// Эта функция вызывается щелчком по кнопке Назад в панели навигации.
function back() {
    // Для начала следует очистить поле ввода URL-адреса в форме
    document.navbar.url.value = "";

    // Затем с помощью объекта History главного фрейма нежно вернуться
    // назад, если этому не противоречит политика общего происхождения
    try {
        parent.main.history.back();
    }
    catch (e) {
        alert ("Вызов History.back() заблокирован " +
                "политикой общего происхождения: " + e.message);
    }

    // Отобразить URL-адрес документа, к которому был выполнен переход,
    // если это получилось. Вызов updateURL() откладывается,
    // чтобы свойство location.href успело обновиться.
    setTimeout(updateURL, 1000);
}

// эта функция вызывается щелчком по кнопке Вперед в панели навигации.
function forward() {
    document.navbar.url.value = "";
    try {
        parent.main.history.forward();
    }
    catch (e) {
        alert ("Вызов History.forward() заблокирован " +
            "политикой общего происхождения: " + e.message);
    }
    setTimeout(updateURL, 1000);
}

// Следующая частная функция вызывается функцями back() и forward()
// для обновления текстового поля URL-адреса в форме. Обычно политика общего
// происхождения запрещает изменение свойства location в главном фрейме.
function updateURL() {
    try {
        document.navbar.url.value = parent.main.location.href;
    }
    catch(e){
        document.navbar.url.value = "<Политика общего происхождения " +
                "блокирует доступ к URL>";
    }
}

// Вспомогательная функция: если URL не начинается с префикса "http://", добавить его.
function fixup(url){
    var upurl = url.substring(0, 4);
    if (upurl != "http"){
        alert("Введите полный URL-адрес с указанием протокола http:// или https://.");
    }
    else {
        if (url.substring(0, 8) == "https://") {
            alert("Данный сайт можно открыть только в новом окне.");
            url = url;
        }
        else {
            if (url.substring(0, 7) == "http://") {
                url = url;
            }
        }
        return url;
    }
}

// Эта функция вызывается щелчком по кнопке Перейти в панели навигации,
// а так же при подтверждении пользователем формы.
function go() {
    // И загружает документ с заданным URL-адресом в главный фрейм.
    alert(fixup(document.navbar.url.value));
    parent.main.location = fixup(document.navbar.url.value);
}

// Открывает новое окно и отображает в нем URL-адрес, заданный пользователем.
function displayInNewWindow() {
    // Открыть обычное неименованное полноценное окно, для чего достаточно
    // определить аргумент URL. После того как окно будет открыто,
    // панель навигации потеряет контроль над ним.
    window.open(fixup(document.navbar.url.value));
}