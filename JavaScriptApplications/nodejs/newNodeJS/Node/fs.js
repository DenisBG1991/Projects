const fs = require('Node/fs');

/*
let dir = fs.readdirSync('../');
console.log(dir);
*/

fs.readdir('../', (error, dir) => {
    if (error) return console.log(error);

    console.log(dir);
});

console.log("Done!");