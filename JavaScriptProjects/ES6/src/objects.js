let firstName = "Denis",
    lastName = "Boriskov",
    email = "bdg1991@mail.ru";

let person = {
    firstName,
    lastName,
    email,
    sayHello() {
        console.log(`Hi my name is ${this.firstName} ${this.lastName}`);
    },
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
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
    return {
        [property]: value,
        ['__' + property]: value*value,
        [property.toUpperCase()]: value + 1,
        ['get' + property]() {
            return this[property];
        }
    };
}

console.log(createCar("vin", 2));