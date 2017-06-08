"use strict";

var sum1 = function sum1(x, y) {
    return x + y;
};
console.log(sum1(4, 45));

var square1 = function square1(x) {
    return x * x;
};
console.log(square1(5));

var number = function number() {
    return 100;
};
console.log(number());

var getPerson = function getPerson() {
    return { name: "Denis" };
};
console.log(getPerson());

(function () {
    return console.log("IIFE");
})();

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var sum2 = 0;

numbers.forEach(function (val) {
    return sum2 += val;
});

var square2 = numbers.map(function (val) {
    return val * val;
});

console.log(sum2);
console.log(square2);

var person = {
    name: "Denis",
    greet: function greet() {
        var _this = this;

        setTimeout(function () {
            console.log("Hello " + _this.name);
            console.log(_this);
        }, 2000);
    }
};

person.greet();

/**
 * Стрелочные функции не применяются для создания конструктора, в функциях bind(), call(), apply().
 */