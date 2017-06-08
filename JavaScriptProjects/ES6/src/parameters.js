function greet(greeting = "Hello", name = "Denis") {
    console.log(`${greeting} ${name}`);
}

greet(undefined ,"Tom");

function sum(...values) {
    console.log(values.reduce((prevValue, currentValue) => prevValue + currentValue));
}

sum(5, 6, 13, 424);