require("babel-polyfill");

function getData(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), 3000));
}

async function sum1(x) {
    let a = getData(20);
    let b = getData(30);
    return x + await a + await b;
}

async function sum2(x) {
    let a = getData(20);
    let b = getData(30);
    return x +  a + b;
}

async function sum3(x) {
    let a = getData(20);
    let b = getData(30);
    return x +  a + await b;
}

async function sum4(x) {
    let a = getData(20);
    let b = getData(30);
    return x +  await a + b;
}

//sum1(10).then(v => console.log(v));
// Ждет 3 секунды и после этого возвращает 60 (10 + 20 + 30)

//sum2(10).then(v => console.log(v));
// Сразу возвращает 10[object Promise][object Promise] и после ждет 3 секунды

//sum3(10).then(v => console.log(v));
// Ждет 3 секунды и после этого возвращает 10[object Promise]30

//sum4(10).then(v => console.log(v));
//Ждет 3 секунды и после этого возвращает 30[object Promise] (10 + 20 + [object Promise]

async function newSum1(x) {
    let a = await getData(20);
    let b = await getData(30);
    return x + a + b;
}

async function newSum2(x) {
    let a = getData(20);
    let b = await getData(30);
    return x + a + b;
}

async function newSum3(x) {
    let a = await getData(20);
    let b = getData(30);
    return x + a + b;
}

//newSum1(10).then(v => console.log(v));
// Ждет 6 секунд и после этого возвращает 60 (10 + 20 + 30)

//newSum2(10).then(v => console.log(v));
// Ждет 3 секунды и после этого возвращает 10[object Promise]30

//newSum3(10).then(v => console.log(v));
//Ждет 3 секунды и после этого возвращает 30[object Promise] после чего ждет еще 3 секунды