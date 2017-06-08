let staticLanguages = ["C", "C++", "Java"];
let dynamicLanguages = ["JavaScript", "PHP", "Ruby"];
let languages = [...staticLanguages, "C#", ...dynamicLanguages, "Python"];

console.log(languages);

function sum(a, b, c) {
    console.log(a+b+c);
}

let numbers = [12, 23, 56];

sum(...numbers);