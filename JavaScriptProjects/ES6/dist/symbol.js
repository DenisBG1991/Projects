"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
let symbol1 = Symbol('name');
let symbol2 = Symbol('name');
console.log(symbol1 === symbol2);

let symbol3 = Symbol.for('name');
let symbol4 = Symbol.for('name');
console.log(symbol3 === symbol4);
let name1 = Symbol.keyFor(symbol1);
let name3 = Symbol.keyFor(symbol3);
console.log(name1, name3);
 **/
var password = Symbol("password");

var user = _defineProperty({
    username: 'r2d2'
}, password, "c3po");

console.log(user.password);
console.log(Object.keys(user));
console.log(Object.getOwnPropertyNames(user));

/*
let password = user[Symbol.for("password")];
console.log(password);                                  // c3po
*/

console.log(Object.getOwnPropertySymbols(user)); // [Symbol(password)]