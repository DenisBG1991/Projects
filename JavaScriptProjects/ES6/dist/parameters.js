"use strict";

function greet() {
    var greeting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Hello";
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Denis";

    console.log(greeting + " " + name);
}

greet(undefined, "Tom");

function sum() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
    }

    console.log(values.reduce(function (prevValue, currentValue) {
        return prevValue + currentValue;
    }));
}

sum(5, 6, 13, 424);