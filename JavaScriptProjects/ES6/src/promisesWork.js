"use strict";

let movieList = document.getElementById('movies');

function addMovieToList(movie) {
    let img = document.createElement('img');
    img.src = movie.Poster;
    movieList.appendChild(img);
}

function getData(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.response);
                resolve(json.Search);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function (error) {
            reject(error);
        };
        xhr.send();
    });
}

let search = 'batman';

/*
getData(`http://www.omdbapi.com/?apikey=57d13b99&s=${search}`)
    .then(movies =>
        movies.forEach(movie =>
            addMovieToList(movie)))
    .catch(error => console.error(error));
    */

let superMan = getData(`http://www.omdbapi.com/?apikey=57d13b99&s=superman`);
let batman = getData(`http://www.omdbapi.com/?apikey=57d13b99&s=batman`);

/*
batman.then(movies =>
    movies.forEach(movie =>
        addMovieToList(movie)))
    .catch(error => console.error(error));

superMan.then(movies =>
    movies.forEach(movie =>
        addMovieToList(movie)))
    .catch(error => console.error(error));
    */

Promise.race([superMan, batman])
    .then(movies =>
        movies.forEach(movie =>
            addMovieToList(movie)))
    .catch(error => console.error(error));

/**
function go(num) {
    return new Promise(function (resolve, reject) {
        let delay = Math.ceil(Math.random()*3000);
        console.log(num, delay);
        setTimeout(() => {
            if (delay > 2000) {
                reject(num);
            } else {
                resolve(num);
            }
        }, delay);
    });
}

let p1 = go(1);
let p2 = go(2);
let p3 = go(3);

Promise.race([p2 ,p1, p3])
    .then(value => console.log(value))
    .catch(error => console.error(error));
    **/