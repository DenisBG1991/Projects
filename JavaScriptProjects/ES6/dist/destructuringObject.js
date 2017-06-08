"use strict";

var person = {
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

function post(url, _ref) {
    var _ref$data = _ref.data,
        firstName = _ref$data.firstName,
        lastName = _ref$data.lastName,
        cache = _ref.cache;

    console.log(firstName);
    console.log(lastName);
    console.log(cache);
}

var result = post('api/users', { data: person, cache: false });

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

var _getUserInfo = getUserInfo(),
    firstName = _getUserInfo.firstName,
    lastName = _getUserInfo.lastName,
    _getUserInfo$social = _getUserInfo.social,
    facebook = _getUserInfo$social.facebook,
    twitter = _getUserInfo$social.twitter;

console.log(firstName, lastName, facebook, twitter);