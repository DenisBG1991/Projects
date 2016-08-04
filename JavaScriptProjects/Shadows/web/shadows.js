/**
 * Shadows.js: создание эффекта тени в текстовых элементах средствами CSS.
 *
 * Этот модуль определяет единственный глобальный объект с именем Shadows.
 * Свойствами этого объекта являются две вспомогательные функции.
 *
 * Shadows.add(element, shadows):
 *  Добавляет заданные тени к заданному элементу. Первый аргумент -
 *  это элемент документа или идентификатор элемента. Данный элемент должен
 *  иметь единственный дочерний текстовый элемент. Эффект тени
 *  будет воспроизводиться в этом дочернем элементе.
 *  Порядок определения теней в аргументе shadows описывается далее.
 *
 * Shadows.addAll(root, tagname):
 *  Отыскивает все элементы-потомки заданного корневого элемента с указанным
 *  именем тега. Если в одном из найденных элементов обнаруживается атрибут
 *  shadow, вызывается функция Shadows.add(), который передается элемент
 *  и значение атрибута shadow. Если имя тега не задано, выполняется проверка
 *  всех элементов. Если корневой элемент не задан, поиск ведется по всему
 *  документу. Данная функция вызывается единожды после загрузки документа.
 *
 * Порядок определения теней:
 *
 * Тени задаются строкой в формате [x y color]+. Таким образом, одна или
 * более групп определяют смещение по оси x, смещение по оси y и цвет.
 * Каждое из этих значений должно соответствовать формату CSS. Если задается
 * более одной тени, самая первая тень оказывается самой нижней и ее перекрывают
 * все следующие тени. Например: "4px 4px #ccc 2px 2px #aaa".
 */
var Shadows = {};

// Добавить тени к единственному указанному элементу
Shadows.add = function(element, shadows) {
    if (typeof element == "string"){
        element = document.getElementById(element);
    }

    // Разбить строку по пробелам, предварительно отбросив начальные
    // и конечные пробелы
    shadows = shadows.replace(/^\s+/, "").replace(/\s+$/, "");
    var args = shadows.split(/\s+/);

    // Найти тукстовый узел, в котором будет реализован эффект тени.
    // Этот модуль должен быть расширен, если необходимо добиться эффекта
    // во всех дочерних элементах. Однако с целью упрощения примера
    // мы решим учитывать только один дочерний элемент.
    var textnode = element.firstChild;

    // Придать контейнерному элементу режим относительного позиционирования,
    // чтобы можно было вывести тени относительно его.
    element.style.position = "relative";

    // Создать тени
    var numshadows = args.length/3;         // количество теней
    for (var i = 0; i < numshadows; i++) {
        var shadowX = args[i*3];
        var shadowY = args[i*3 + 1];
        var shadowColor = args[i*3 + 2];

        // Создать новый элемент <span> для размещения тени
        var shadow = document.createElement("span");

        // Использовать атрибут style для указания смещения и цвета
        shadow.setAttribute("style", "position:absolute; " +
                            "left:" + shadowX + "; " +
                            "top:" + shadowY + "; " +
                            "color:" + shadowColor + ";");

        // Добавить копию текстового узла с тенью в элемент span
        shadow.appendChild(textnode.cloneNode(false));

        // Затем добавить элемент span в контейнер
        element.appendChild(shadow);
    }

    // Теперь нужно поместить тескт поверх тени. Сначала создается <span>
    var text = document.createElement("span");
    text.setAttribute("style", "position: relative");   // Позиционирование
    text.appendChild(textnode);     // Переместить оригинальный текстовый узел
    //alert(text.textContent);
    element.appendChild(text);      // и добавить элемент span в контейнер
};

// Просматривает дерево документа, начиная от заданного корневого элемента,
// в поисках элементов с заданным именем тега. Если в найденном эдементе
// установлен атрибут shadow, он передается методу Shadows.add() для создания
// эффекта тени. Если аргумент root опущен, используется объект document.
// Если имя тега опущено, поиск ведется во всех тегах.
Shadows.addAll = function(root, tagname){
    if (!root) root = document;
    if (!tagname) tagname = '*';
    var elements = root.getElementsByTagName(tagname);
    for (var j = 0; j < elements.length; j++){
        var shadow = elements[j].getAttribute("shadow");
        if (shadow) Shadows.add(elements[j], shadow);
    }
};

// Зарегистрировать функцию Shadows.addAll() как обработчик события onload
if (window.addEventListener) window.addEventListener("load", Shadows.addAll, false);
else if (window.attachEvent) window.attachEvent("onload", Shadows.addAll);