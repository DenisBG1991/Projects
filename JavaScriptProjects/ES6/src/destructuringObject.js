let person = {
    firstName: "Jon",
    lastName: "Snow",
    social: {
        facebook: "Facebook",
        twitter: "Twitter"
    }
};

//let {firstName: first, lastName: last, age = 26} = person;
//let {['first' + 'Name']: first, lastName: last, age = 26} = person;
//let {firstName: first, lastName: last, social: {facebook: fb}, age = 26} = person;

//console.log(first, last, fb, age);

function post(url, {data: {firstName, lastName}, cache}) {
    console.log(firstName);
    console.log(lastName);
    console.log(cache);
}

let result = post('api/users', {data: person, cache: false});

function getUserInfo() {
    return {
        firstName: "Jon",
        lastName: "Snow",
        social: {
            facebook: "Facebook",
            twitter: "Twitter"
        }
    };
}

let {firstName, lastName, social: {facebook, twitter}} = getUserInfo();

console.log(firstName, lastName, facebook, twitter);