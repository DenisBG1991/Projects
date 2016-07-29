var bounce = {
    /** @namespace bounce.win.closed */
    x:0, y:0, w:200, h:200,         // Положение окна и его размер;
    dx:1, dy:1,                     // Скорость перемещения;
    interval: 10,                  // Частота обновления в миллисекундах;
    win: null,                      // Создаваемое окно;
    timer: null,                    // Возвращаемое значение метода setInterval();

    // Запуск анимации:
    start: function() {
        // Вначале окно располагается в центре экрана
        bounce.x = (screen.width - bounce.w)/2;
        bounce.y = (screen.height - bounce.h)/2;

        // Создать окно которое будет перемещаться по экрану
        // URL javascript: - простейший способ вывести короткий документ
        // Последний аргумент определяет размеры окна
        bounce.win = window.open('javascript:"<h1>ОТСКОК</h1>"',"",
                                 "left=" + bounce.x + ", top=" + bounce.y +
                                 ", width=" + bounce.w + ", height=" + bounce.h +
                                 ", status=yes");

        // Использовать setInterval() для вызова метода nextFrame() через
        // каждый установленный интервал времени. Сохранить возвращаемое
        // значение, чтобы иметь возможность остановить анимацию
        // вызовом clearInterval().
        bounce.timer = setInterval(bounce.nextFrame, bounce.interval);
    },

    // Остановить анимацию
    stop: function() {
        clearInterval(bounce.timer);                        // Прервать работу таймера
        if (!bounce.win.closed) bounce.win.close();         // Закрыть окно
    },

    // Отобразить следующий кадр. Вызывается методом setInterval().
    nextFrame: function() {

        // Если пользователь закрыл окно - прекратить работу
        if (bounce.win.closed) {
            clearInterval(bounce.timer);
            return;
        }

        // Имитировать отскок, если была достигнута правая или левая границы
        if ((bounce.x + bounce.dx > (screen.availWidth - bounce.w)) ||
            (bounce.x + bounce.dx < 0)) bounce.dx = - bounce.dx;

        // Имитировать отскок, если была достигнута верхняя или нижняя границы
        if ((bounce.y + bounce.dy > (screen.availHeight - bounce.h)) ||
            (bounce.y + bounce.dy < 0)) bounce.dy = - bounce.dy;

        // Обновить координаты окна
        bounce.x += bounce.dx;
        bounce.y += bounce.dy;

        // Переместить окно в новую позицию
        bounce.win.moveTo(bounce.x, bounce.y);

        // Отобразить текущие координаты в строке состояния
        bounce.win.defaultSatus = "(" + bounce.x + ", " + bounce.y + ")";
    }
};
