"use strict";

var staticLanguages = ["C", "C++", "Java"];
var dynamicLanguages = ["JavaScript", "PHP", "Ruby"];
var languages = [].concat(staticLanguages, ["C#"], dynamicLanguages, ["Python"]);

console.log(languages);

function sum(a, b, c) {
    console.log(a + b + c);
}

var numbers = [12, 23, 56];

sum.apply(undefined, numbers);