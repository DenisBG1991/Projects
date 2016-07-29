/*
 * listanchors.js: Создает простое оглавление с помощью document.anchors[].
 *
 * Функция listanchors() получает документ в качестве аргумента и открывает
 * новое окно, которое выступает в роли "окна навигации" по этому документу.
 * Новое окно отображает список всех якорных элементов документа.
 * Щелчок по любой записи из списка вызывает прокрутку элемента
 * в позицию заданного якорного элемента.
 */
function listanchors(d) {
    // Открыть новое окно
    var newwin = window.open("", "newwin",
                            "menubar = yes, scrollbars = yes, resizable = yes," +
                            "width = 500, height = 300");

    // Установить заголовок
    newwin.document.write("<h1>Окно навигации: " + d.title + "</h1>");

    // Перечислить все якорные элементы
    for (var i = 0; i < d.anchors.length; i++){
        // Для каждого якорного элемента нужно получить текст для отображения
        // в списке. В первую очередь надо попытаться получить текст, расположенный
        // между тегами <a> и </a>, с помощью свойства, зависящего от типа браузера.
        // Если текст отсутствует, тогда использовать значение свойства name.
        var a = d.anchors[i];
        var antext = null;
        if (a.text) {
            antext = a.text;
        }
        if ((antext == null) || (antext == '')) {
            antext = a.name;
        }

        // Теперь вывести этот текст в виде ссылки. Свойство href этой ссылки
        // использоваться не будет: всю работу выполняет обработчик события
        // onclick, он устанавливает свойство location.hash оригинального
        // окна, чтобы вызывать прокрутку окна до заданного якорного элемента.
        // См. описание свойств Window.opener, Window.location,
        // Location.hash и Link.onclick.
        newwin.document.write('<a href = "#' + a.name + '"' +
                              ' onclick = "opener.location.hash = \'' + a.name +
                              '\'; return false;">');
        newwin.document.write(antext);
        newwin.document.write('</a><br>');
    }
    newwin.document.close();
}