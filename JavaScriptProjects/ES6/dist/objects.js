"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var firstName = "Denis",
    lastName = "Boriskov",
    email = "bdg1991@mail.ru";

var person = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    sayHello: function sayHello() {
        console.log("Hi my name is " + this.firstName + " " + this.lastName);
    },

    get fullName() {
        return this.firstName + " " + this.lastName;
    },
    set fullName(value) {
        this.firstName = value;
    }
};

console.log(person);
console.log(person.fullName);
person.fullName = "Den";
console.log(person.fullName);

function createCar(property, value) {
    var _ref;

    return _ref = {}, _defineProperty(_ref, property, value), _defineProperty(_ref, '__' + property, value * value), _defineProperty(_ref, property.toUpperCase(), value + 1), _defineProperty(_ref, 'get' + property, function () {
        return this[property];
    }), _ref;
}

console.log(createCar("vin", 2));