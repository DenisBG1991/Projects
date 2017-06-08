function greet(name) {
    console.log(upperName`Hello ${name}`);
}

function upperName(literals, ...values) {
    return literals[0] + values[0].toUpperCase();
}

greet("Denis");

function createEmail(to, from, subject, message) {
    console.log(`
    To: ${to}
    From: ${from}
    Subject: ${subject}
    Message: ${message}
    `);
}

createEmail("bill@mail.com", 'jane@mail.com', "Hello", "How are you doing?");

function sum(a, b) {
    console.log(`${a} + ${b} = ${parseInt(a) + parseInt(b)}`);
}

sum(12, 54);