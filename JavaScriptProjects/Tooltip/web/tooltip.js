/**
 * Tooltip.js: простейшие всплывающие подсказки, отбрасывающие тень.
 *
 * Этот модуль определяет класс Tooltip. Объекты класса Tooltip создаются
 * с помощью конструктора Tooltip(). После этого подсказку можно сделать
 * видимой вызовом метода show(). Чтобы скрыть подсказку, следует
 * вызвать метод hide().
 *
 * Обратите внимание: для корректного отображения подсказок с использованием
 * этого модуля необходимо добавить соответствующие определения CSS-классов
 * Например:
 *
 * .tooltipShadow {
 *      background: url(shadow.png);     полупрозрачная тень
 * }
 *
 * .tooltipContent {
 *      left: -4px; top: -4px;
 *      background-color: #ff0;
 *      border: solid black 1px;
 *      padding: 5px;
 *      font: bold 10pt sans-serif;
 * }
 *
 * В браузерах, поддерживающих возможность отображения полупрозрачных
 * изображений формата PNG, можно органировать отображение полупрозрачной
 * тени. В остальных браузерах придется использовать для тени сплошной цвет
 * или эмелировать полупрозрачность с помощью изображения формата GIF.
 */
function Tooltip(){     // Функция-конструктор класса Tooltip
    this.tooltip = document.createElement("div");   // Создать div для тени
    this.tooltip.style.position = "absolute";       // Абсолютное позиционирование
    this.tooltip.style.visibility = "hidden";       // Изначально подсказка скрыта
    this.tooltip.className = "tooltipShadow";       // Определить его стиль

    this.content = document.createElement("div");   // Создать div с содержимым
    this.content.style.position = "relative";       // Относительное позиционирование
    this.content.className = "tooltipContent";      // Определить его стиль

    this.tooltip.appendChild(this.content);         // Добавить содержимое к тени
}

// Определить содержимое, установить позицию окна с подсказкой и отобразить ее
Tooltip.prototype.show = function (text, x, y){
    this.content.innerHTML = text;          // Записать текст подсказки
    this.tooltip.style.left = x + "px";     // Определить положение
    this.tooltip.style.top = y + "px";
    this.tooltip.style.visibility = "visible";

    // Добавить подсказку в документ, если это еще не сделано
    if (this.tooltip.parentNode != document.body){
        document.body.appendChild(this.tooltip);
    }
};

// Скрыть подсказку
Tooltip.prototype.hide = function(){
    this.tooltip.style.visibility = "hidden";
};

// Следующие значения используются мотодом shedule(), определенным далее.
// Они используются как константы, но доступны для записи, поэтому вы можеье
// переопределить эти значения, предлагаемые по умолчанию.
Tooltip.X_OFFSET = 25;      // пикселов вправо от указателя мыши
Tooltip.Y_OFFSET = 15;      // пикселов вниз от указателя мыши
Tooltip.DELAY = 500;        // миллисекунд после события mouseover

/**
 * Данный метод планирует появление всплывающей подсказки над указанным
 * элементом через Tooltip.DELAY миллисекунд от момента события.
 * Аргумент "e" должен быть объектом события mouseover. Данный метод извлекает
 * координаты мыши из объекта события, преобразует их из конных координат
 * в координаты документа и добавляет вышеуказанные смещения.
 * Определяет текст подсказки, обращаеясь к атрибуту "tooltip" заданного
 * элемента. Данный метод автоматически регистрирует обработчик события
 * onmouseout и отменяет его регистрацию. Этот обработчик выполняет скрытие
 * подсказки или отменяет ее запланированное появление.
 */
Tooltip.prototype.schedule = function(target, e){
    // Получить текст для отображения. Если текст отсутствует - ничего не делать.
    var text = target.getAttribute("tooltip");
    if (!text) return;

    // Объект собфтия хранит оконные координаты указателя мыши.
    // Поэтому они преобразуются в координаты документа с помощью модуля Geometry.
    var x = e.clientX + window.pageXOffset;
    var y = e.clientY = window.pageYOffset;

    // Добавить смещения, чтобы подсказка появлялась правее и ниже указателя мыши.
    x += Tooltip.X_OFFSET;
    y += Tooltip.Y_OFFSET;

    // Запланировать появление подсказки.
    var self = this;    // Это необходимо для вложенных функций
    var timer = window.setTimeout(function(){self.show(text, x, y);},Tooltip.DELAY);

    // Зарегистрировать обработчик onmouseout, чтобы скрыть подсказку
    // или отменить появление запланированной подсказки.
    if (target.addEventListener) target.addEventListener("mouseout", mouseout, false);
    else if (target.attachEvent) target.attachEvent("onmouseout", mouseout);
    else target.onmouseout = mouseout;

    // Реализация слушателя события производится далее
    function mouseout() {
        self.hide();
        window.clearTimeout(timer);     // Отменить все запланированные подсказки
        // и удалить себя, так как обработчик запускается единожды
        if (target.removeEventListener) target.removeEventListener("mouseout", mouseout, false);
        else if (target.detachEvent) target.detachEvent("onmouseout", mouseout);
        else target.onmouseout = null;
    }
};