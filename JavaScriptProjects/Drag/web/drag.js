/**
 * Drag.js: перетаскивание абсолютно позиционируемых HTML-элементов.
 *
 * Данный модуль определяет единственную функцию drag(),
 * которая предназначена для вызова из обработчика события onmousedown.
 * Последующие события mousemove будут вызывать перемещение заданного элемента.
 * Событие mouseup завершит операцию перетаскивания.
 *
 * Аргументы:
 *
 *      elementToDrag: элемент, получивший событие mousedown или содержащий
 *          его контейнерный элемент. Он должен позиуионироваться в абсолютных
 *          координатах. Значение его свойств style.left и style.top будут
 *          изменяться по мере пертаскивания элемента пользователем.
 *
 *      event: объект Event события mousedown.
 */
function drag(elementToDrag, event){
    var startX = event.clientX;
    var startY = event.clientY;
    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;
    var deltaX = startX - origX;
    var deltaY = startY - origY;

    document.addEventListener("mousemove", moveHandler, true);
    document.addEventListener("mouseup", upHandler, true);

    // Событие сработало, необходимо прервать его дальнейшее распространение.
    event.stopPropagation();

    // Теперь необходимо предотвратить выполнение действия по умолчанию.
    event.preventDefault();

    /**
     * Следующий обработчик перехватывает события mousemove в процессе
     * перетаскивания элемента. Он отвечает за перемещение элемента.
     */
    function moveHandler(e){
        if (!e) e = window.event;
        elementToDrag.style.left = (e.clientX - deltaX) + "px";
        elementToDrag.style.top = (e.clientY - deltaY) + "px";
        e.stopPropagation();
    }

    /**
     * Этот обработчик перехватывает заключительное событие mouseup,
     * которое возникает в конце операции перетаскивания.
     */
    function upHandler(e){
        if (!e) e = window.event;
        document.removeEventListener("mousemove", moveHandler, true);
        document.removeEventListener("mouseup", upHandler, true);
        e.stopPropagation();
    }
}