// Обыкновенная функция, которая принимает два обязательных аргумента, один из которых
// является числом, другой массивом. Функция осуществляет проверку равенства длины массива
// конкретному числу. Если число не является целым, округляет его в меньшую сторону.
// На выходе получается логическое значение сравнения.
var inArray = function(lenght, array){
    var bool = Boolean(false);
    if (arguments.length < 2){
        throw new Error ("Недостаточно аргументов у функции inArray().");
    }
    if (typeof lenght == "number" && array instanceof Array && lenght > 0){
        lenght = Math.floor(lenght);
        if (array.length == lenght){
            bool = true;
        }
        return bool;
    }
    else {
        throw new Error ("Указаны не правильные аргументы у функции inArray().");
    }
};

// Данная функция является методом объекта Array. Осуществляет тоже самое, что и функция
// выше, но принимает всего один аргумент (число). Поскольку она является методом объекта
// Array, то применяется непосредственно к массиву.
Array.prototype.inArray = function(lenght){
    var bool = Boolean(false);
    if (arguments.length < 1){
        throw new Error ("Недостаточно аргументов у функции inArray().");
    }
    if (typeof lenght == "number" && lenght > 0){
        lenght = Math.floor(lenght);
        if (this.length == lenght){
            bool = true;
        }
        return bool;
    }
    else {
        throw new Error ("Указаны не правильные аргументы у функции inArray().");
    }
};