let sum1 = (x, y) => x + y;
console.log(sum1(4, 45));

let square1 = x => x * x;
console.log(square1(5));

let number = () => 100;
console.log(number());

let getPerson = () => ({name: "Denis"});
console.log(getPerson());

(() => console.log("IIFE"))();

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let sum2 = 0;

numbers.forEach(val => sum2 += val);

let square2 = numbers.map(val => val * val);

console.log(sum2);
console.log(square2);

let person = {
    name: "Denis",
    greet: function () {
        setTimeout(() => {
            console.log(`Hello ${this.name}`);
            console.log(this);
        }, 2000);
    }
};

person.greet();

/**
 * Стрелочные функции не применяются для создания конструктора, в функциях bind(), call(), apply().
 */